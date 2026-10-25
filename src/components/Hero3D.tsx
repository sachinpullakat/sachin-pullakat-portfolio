import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Visual idea: a LiDAR-style point cloud with a 3D bounding box and a scan
// plane sweeping through it. It is the 3D version of the corner-bracket motif
// in Hero.tsx (object-detection box), so the 3D reads as the CV subject matter
// rather than decoration.
//
// "Lighting" is done in the point shader (a point cloud has no surface to light):
// each point carries its source surface normal, which gives a soft key light
// from the upper left, a rim term on silhouette edges, and depth fade.

// Raw sRGB floats for the shader (ShaderMaterial skips colour-space conversion).
const BASE = new THREE.Vector3(0x3e / 255, 0x5f / 255, 0xa3 / 255); // signal-dim
const BRIGHT = new THREE.Vector3(0x8a / 255, 0xb0 / 255, 0xff / 255); // signal-bright

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uScan;
  uniform float uPixelRatio;
  uniform float uIntro;
  attribute float aSeed;
  varying float vGlow;
  varying float vDepth;
  varying float vLight;
  varying float vRim;

  // Normalised key-light direction (upper left, towards the viewer), precomputed.
  const vec3 KEY_DIR = vec3(-0.4504, 0.6006, 0.6606);

  void main() {
    vec3 p = position * mix(1.14, 1.0, uIntro);
    p += 0.015 * vec3(
      sin(uTime * 1.3 + aSeed * 40.0),
      cos(uTime * 1.1 + aSeed * 31.0),
      sin(uTime * 0.9 + aSeed * 23.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Surface normal in view space: soft wrap key light + silhouette rim.
    vec3 vn = normalize(normalMatrix * normal);
    vLight = mix(0.45, 1.0, clamp(dot(vn, KEY_DIR) * 0.5 + 0.5, 0.0, 1.0));
    vRim = pow(1.0 - clamp(abs(vn.z), 0.0, 1.0), 2.5);

    float d = abs(p.y - uScan);
    vGlow = 1.0 - smoothstep(0.0, 0.35, d);
    vGlow = clamp(vGlow + 0.12 * sin(uTime * 2.0 + aSeed * 50.0), 0.0, 1.0);
    vDepth = clamp((-mv.z - 4.5) / 4.0, 0.0, 1.0);

    float size = (2.1 + 3.0 * vGlow + 1.0 * vRim) * uPixelRatio;
    gl_PointSize = size * (7.0 / -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uBright;
  uniform float uIntro;
  varying float vGlow;
  varying float vDepth;
  varying float vLight;
  varying float vRim;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = 1.0 - smoothstep(0.15, 0.5, r);
    float lift = clamp(vGlow + 0.5 * vRim, 0.0, 1.0);
    vec3 col = mix(uBase * vLight, uBright, lift);
    float alpha = soft * (0.95 - 0.5 * vDepth) * uIntro;
    gl_FragColor = vec4(col, alpha);
  }
`;

function buildPointCloud(density: number) {
  const knot = new THREE.TorusKnotGeometry(1.05, 0.34, 360, 24);
  const src = knot.getAttribute("position");
  const srcNormal = knot.getAttribute("normal");
  const count = Math.floor(src.count / density);
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const j = i * density;
    // Small jitter so it reads as a scanned cloud, not a clean mesh.
    positions[i * 3] = src.getX(j) + (Math.random() - 0.5) * 0.04;
    positions[i * 3 + 1] = src.getY(j) + (Math.random() - 0.5) * 0.04;
    positions[i * 3 + 2] = src.getZ(j) + (Math.random() - 0.5) * 0.04;
    normals[i * 3] = srcNormal.getX(j);
    normals[i * 3 + 1] = srcNormal.getY(j);
    normals[i * 3 + 2] = srcNormal.getZ(j);
    seeds[i] = Math.random();
  }
  knot.dispose();

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.computeBoundingBox();

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uScan: { value: 0 },
      uPixelRatio: { value: 1 },
      uIntro: { value: 0 },
      uBase: { value: BASE },
      uBright: { value: BRIGHT },
    },
  });

  return { geometry, material, box: geometry.boundingBox as THREE.Box3 };
}

// Eight corner brackets (3 short segments per corner) — same look as the 2D hero.
function buildCornerBrackets(box: THREE.Box3, pad: number) {
  const min = box.min.clone().subScalar(pad);
  const max = box.max.clone().addScalar(pad);
  const len = Math.min(max.x - min.x, max.y - min.y, max.z - min.z) * 0.22;
  const pts: number[] = [];

  for (const x of [min.x, max.x]) {
    for (const y of [min.y, max.y]) {
      for (const z of [min.z, max.z]) {
        const sx = x === min.x ? 1 : -1;
        const sy = y === min.y ? 1 : -1;
        const sz = z === min.z ? 1 : -1;
        pts.push(x, y, z, x + sx * len, y, z);
        pts.push(x, y, z, x, y + sy * len, z);
        pts.push(x, y, z, x, y, z + sz * len);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  const material = new THREE.LineBasicMaterial({
    color: "#5B8DEF",
    transparent: true,
    opacity: 0.9,
  });
  return { object: new THREE.LineSegments(geometry, material), min, max };
}

// Rectangle outlining the box cross-section; slides up and down with the scan.
function buildScanRing(min: THREE.Vector3, max: THREE.Vector3) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [min.x, 0, min.z, max.x, 0, min.z, max.x, 0, max.z, min.x, 0, max.z],
      3,
    ),
  );
  const material = new THREE.LineBasicMaterial({
    color: "#8AB0FF",
    transparent: true,
    opacity: 0.6,
  });
  return new THREE.LineLoop(geometry, material);
}

type Pointer = { x: number; y: number };

const easeOutCubic = (v: number) => 1 - Math.pow(1 - v, 3);

function Scene({ pointer }: { pointer: MutableRefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);
  // Smoothed copy of the pointer, so camera and rotation never jump.
  const smooth = useRef<Pointer>({ x: 0, y: 0 });

  const parts = useMemo(() => {
    const isSmall = typeof window !== "undefined" && window.innerWidth < 640;
    const cloud = buildPointCloud(isSmall ? 3 : 1);
    const points = new THREE.Points(cloud.geometry, cloud.material);
    const brackets = buildCornerBrackets(cloud.box, 0.18);
    const ring = buildScanRing(brackets.min, brackets.max);
    return { cloud, points, brackets, ring };
  }, []);

  useEffect(() => {
    return () => {
      parts.cloud.geometry.dispose();
      parts.cloud.material.dispose();
      parts.brackets.object.geometry.dispose();
      (parts.brackets.object.material as THREE.Material).dispose();
      parts.ring.geometry.dispose();
      (parts.ring.material as THREE.Material).dispose();
    };
  }, [parts]);

  useFrame((state, rawDelta) => {
    const g = group.current;
    if (!g) return;
    // After a paused period (tab hidden, off-screen) the first delta is huge.
    const delta = Math.min(rawDelta, 0.1);
    const t = state.clock.elapsedTime;
    const { box } = parts.cloud;
    const u = parts.cloud.material.uniforms;

    // Intro: points resolve in over ~1.6s after a short beat.
    const intro = easeOutCubic(THREE.MathUtils.clamp((t - 0.15) / 1.6, 0, 1));
    u.uIntro.value = intro;
    g.scale.setScalar(0.94 + 0.06 * intro);

    // Scan sweeps bottom -> top, then restarts.
    const phase = (t * 0.16) % 1;
    const y = box.min.y + (box.max.y - box.min.y) * phase;
    u.uTime.value = t;
    u.uScan.value = y;
    u.uPixelRatio.value = state.gl.getPixelRatio();
    parts.ring.position.y = y;
    (parts.ring.material as THREE.LineBasicMaterial).opacity =
      0.7 * Math.sin(Math.PI * phase) * intro;
    (parts.brackets.object.material as THREE.LineBasicMaterial).opacity = 0.9 * intro;

    // Frame-rate-independent damping toward the pointer.
    const s = smooth.current;
    s.x = THREE.MathUtils.damp(s.x, pointer.current.x, 4, delta);
    s.y = THREE.MathUtils.damp(s.y, pointer.current.y, 4, delta);

    // Slow spin + pointer parallax + a little scroll-driven tilt.
    const scrollTilt = Math.min(window.scrollY / 900, 1) * 0.6;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * 0.22 + s.x * 0.5, 3.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -s.y * 0.35 + scrollTilt, 3.5, delta);

    // Tiny camera drift opposite the pointer gives parallax depth.
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, s.x * 0.25, 2.5, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -s.y * 0.15, 2.5, delta);
    cam.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <primitive object={parts.points} />
      <primitive object={parts.brackets.object} />
      <primitive object={parts.ring} />
    </group>
  );
}

type Hero3DProps = {
  /** false pauses the render loop (hero scrolled out of view). */
  active: boolean;
  /** Called once the WebGL context exists, so the parent can fade the canvas in. */
  onReady: () => void;
  /** Called if the WebGL context is lost, so the parent can swap in the static fallback. */
  onFail: () => void;
};

export default function Hero3D({ active, onReady, onFail }: Hero3DProps) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const recentre = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", recentre);
    window.addEventListener("blur", recentre);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", recentre);
      window.removeEventListener("blur", recentre);
    };
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      // "default" (not "high-performance") so dual-GPU laptops don't wake the discrete GPU for a hero.
      gl={{ antialias: true, alpha: true, powerPreference: "default" }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onFail();
        });
        onReady();
      }}
    >
      <Scene pointer={pointer} />
    </Canvas>
  );
}
