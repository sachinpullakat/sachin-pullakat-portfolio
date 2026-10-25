import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Visual idea: a LiDAR-style point cloud with a 3D bounding box and a scan
// plane sweeping through it. It is the 3D version of the corner-bracket motif
// in Hero.tsx (object-detection box), so the 3D reads as the CV subject matter
// rather than decoration.

// Raw sRGB floats for the shader (ShaderMaterial skips colour-space conversion).
const BASE = new THREE.Vector3(0x3e / 255, 0x5f / 255, 0xa3 / 255); // signal-dim
const BRIGHT = new THREE.Vector3(0x8a / 255, 0xb0 / 255, 0xff / 255); // signal-bright

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uScan;
  uniform float uPixelRatio;
  attribute float aSeed;
  varying float vGlow;
  varying float vDepth;

  void main() {
    vec3 p = position;
    p += 0.015 * vec3(
      sin(uTime * 1.3 + aSeed * 40.0),
      cos(uTime * 1.1 + aSeed * 31.0),
      sin(uTime * 0.9 + aSeed * 23.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float d = abs(p.y - uScan);
    vGlow = smoothstep(0.35, 0.0, d);
    vGlow = clamp(vGlow + 0.12 * sin(uTime * 2.0 + aSeed * 50.0), 0.0, 1.0);
    vDepth = clamp((-mv.z - 4.5) / 4.0, 0.0, 1.0);

    float size = (2.2 + 3.0 * vGlow) * uPixelRatio;
    gl_PointSize = size * (7.0 / -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uBright;
  varying float vGlow;
  varying float vDepth;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, r);
    vec3 col = mix(uBase, uBright, vGlow);
    float alpha = soft * (0.95 - 0.5 * vDepth);
    gl_FragColor = vec4(col, alpha);
  }
`;

function buildPointCloud(density: number) {
  const knot = new THREE.TorusKnotGeometry(1.05, 0.34, 360, 24);
  const src = knot.getAttribute("position");
  const count = Math.floor(src.count / density);
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const j = i * density;
    // Small jitter so it reads as a scanned cloud, not a clean mesh.
    positions[i * 3] = src.getX(j) + (Math.random() - 0.5) * 0.04;
    positions[i * 3 + 1] = src.getY(j) + (Math.random() - 0.5) * 0.04;
    positions[i * 3 + 2] = src.getZ(j) + (Math.random() - 0.5) * 0.04;
    seeds[i] = Math.random();
  }
  knot.dispose();

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
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

function Scene({ pointer }: { pointer: React.MutableRefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);

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

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const { box } = parts.cloud;
    const u = parts.cloud.material.uniforms;

    // Scan sweeps bottom -> top, then restarts.
    const phase = (t * 0.16) % 1;
    const y = box.min.y + (box.max.y - box.min.y) * phase;
    u.uTime.value = t;
    u.uScan.value = y;
    u.uPixelRatio.value = state.gl.getPixelRatio();
    parts.ring.position.y = y;
    (parts.ring.material as THREE.LineBasicMaterial).opacity =
      0.7 * Math.sin(Math.PI * phase);

    // Slow spin + cursor parallax + a little scroll-driven tilt (the "3D scroll" feel).
    const scrollTilt = Math.min(window.scrollY / 900, 1) * 0.6;
    const ease = 1 - Math.pow(0.001, delta);
    const targetY = t * 0.22 + pointer.current.x * 0.5;
    const targetX = -pointer.current.y * 0.35 + scrollTilt;
    g.rotation.y += (targetY - g.rotation.y) * ease;
    g.rotation.x += (targetX - g.rotation.x) * ease;
  });

  return (
    <group ref={group}>
      <primitive object={parts.points} />
      <primitive object={parts.brackets.object} />
      <primitive object={parts.ring} />
    </group>
  );
}

export default function Hero3D({ active }: { active: boolean }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene pointer={pointer} />
    </Canvas>
  );
}
