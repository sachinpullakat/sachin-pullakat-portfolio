import { useMemo } from "react";

// Static stand-in for the 3D scene: used when WebGL is unavailable, the scene
// fails, or the visitor prefers reduced motion. It is the same torus-knot point
// cloud projected to 2D, generated from fixed math (no randomness), so it is
// identical on every load and costs one SVG.

const SIZE = 400;
const T_SAMPLES = 130;
const TUBE_POINTS = 4;
const TILT = 0.9; // radians; tilts the knot so depth reads in 2D

// Deterministic 0..1 hash, so the "scan noise" never changes between renders.
function hash(n: number): number {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

type Dot = { x: number; y: number; r: number; o: number; bright: boolean };

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  const scale = 38;
  for (let i = 0; i < T_SAMPLES; i++) {
    const t = (i / T_SAMPLES) * Math.PI * 2;
    // (2,3) torus knot centreline.
    const cx = (2 + Math.cos(3 * t)) * Math.cos(2 * t);
    const cy = (2 + Math.cos(3 * t)) * Math.sin(2 * t);
    const cz = Math.sin(3 * t);

    for (let k = 0; k < TUBE_POINTS; k++) {
      const seed = i * 7 + k;
      const x = cx + (hash(seed) - 0.5) * 0.7;
      const y = cy + (hash(seed + 101) - 0.5) * 0.7;
      const z = cz + (hash(seed + 202) - 0.5) * 0.7;
      // Rotate about X by TILT, then orthographic project.
      const yr = y * Math.cos(TILT) - z * Math.sin(TILT);
      const zr = y * Math.sin(TILT) + z * Math.cos(TILT);
      const depth = (zr + 3) / 6; // roughly 0 (far) .. 1 (near)
      dots.push({
        x: SIZE / 2 + x * scale,
        y: SIZE / 2 + yr * scale,
        r: 0.9 + depth * 1.4,
        o: 0.25 + depth * 0.6,
        bright: hash(seed + 303) > 0.93,
      });
    }
  }
  return dots;
}

export default function HeroFallback() {
  const dots = useMemo(buildDots, []);
  const pad = 46;
  const len = 44;
  const lo = pad;
  const hi = SIZE - pad;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x.toFixed(1)}
          cy={d.y.toFixed(1)}
          r={d.r.toFixed(2)}
          fill={d.bright ? "#8AB0FF" : "#3E5FA3"}
          opacity={d.o.toFixed(2)}
        />
      ))}
      {/* Corner brackets: same motif as the 3D bounding box and the hero text frame. */}
      <g stroke="#5B8DEF" strokeWidth="1.5" fill="none" opacity="0.8">
        <path d={`M${lo} ${lo + len} V${lo} H${lo + len}`} />
        <path d={`M${hi - len} ${lo} H${hi} V${lo + len}`} />
        <path d={`M${lo} ${hi - len} V${hi} H${lo + len}`} />
        <path d={`M${hi - len} ${hi} H${hi} V${hi - len}`} />
      </g>
    </svg>
  );
}
