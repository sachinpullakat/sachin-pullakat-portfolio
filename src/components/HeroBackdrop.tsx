import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

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

// If WebGL context creation or the scene throws, the hero silently stays 2D.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  // Respect reduced motion and devices without WebGL: no 3D layer at all.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduced && supportsWebGL());
  }, []);

  // Stop rendering when the hero scrolls out of view to save battery/GPU.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 sm:opacity-70 lg:w-3/5 lg:opacity-100"
    >
      {enabled && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Hero3D active={visible} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
