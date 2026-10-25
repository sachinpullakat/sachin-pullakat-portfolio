import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import HeroFallback from "./HeroFallback";
import { useReducedMotion } from "../lib/useReducedMotion";

// three.js + react-three-fiber live in their own chunk, so the page text and
// CTAs render immediately and the 3D layer fades in once it has loaded.
const Hero3D = lazy(() => import("./Hero3D"));

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

// If the scene throws while mounting, report it so the static fallback takes over.
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [webgl] = useState(supportsWebGL);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // Animated 3D only when it is safe and wanted; otherwise the static SVG version.
  const use3D = webgl && !reducedMotion && !failed;

  const onReady = useCallback(() => setReady(true), []);
  const onFail = useCallback(() => setFailed(true), []);

  // If we leave 3D mode (e.g. reduced motion switched on), fade in again next time.
  useEffect(() => {
    if (!use3D) setReady(false);
  }, [use3D]);

  // Stop rendering when the hero scrolls out of view to save battery/GPU.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 sm:opacity-70 lg:w-3/5 lg:opacity-100"
    >
      {use3D ? (
        <div
          className={`h-full w-full transition-opacity duration-1000 ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <SceneBoundary onError={onFail}>
            <Suspense fallback={null}>
              <Hero3D active={visible} onReady={onReady} onFail={onFail} />
            </Suspense>
          </SceneBoundary>
        </div>
      ) : (
        <HeroFallback />
      )}
    </div>
  );
}
