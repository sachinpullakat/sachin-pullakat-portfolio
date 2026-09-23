import { profile } from "../data/profile";

// Visual motif: corner brackets echo an object-detection bounding box —
// a deliberate nod to the CV subject matter (YOLO/DeepSORT work), not decoration.
function Bracket({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-6 w-6 border-signal/70 ${className}`}
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative inline-block px-8 py-8 sm:px-14 sm:py-12">
          <Bracket className="left-0 top-0 border-l-2 border-t-2" />
          <Bracket className="right-0 top-0 border-r-2 border-t-2" />
          <Bracket className="bottom-0 left-0 border-b-2 border-l-2" />
          <Bracket className="bottom-0 right-0 border-b-2 border-r-2" />
          <p className="font-mono text-xs uppercase tracking-wider text-signal-bright">
            {profile.focus}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-graphite-50 sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-prose font-body text-base text-graphite-200 sm:text-lg">
            {profile.heroSupport}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="focus-ring rounded bg-signal px-5 py-2.5 font-body text-sm font-medium text-graphite-950 transition-colors hover:bg-signal-bright"
          >
            View Projects
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded border border-graphite-600 px-5 py-2.5 font-body text-sm text-graphite-50 transition-colors hover:border-signal hover:text-signal-bright"
          >
            GitHub
          </a>
          <a
            href={profile.resumePath}
            className="focus-ring rounded border border-graphite-600 px-5 py-2.5 font-body text-sm text-graphite-50 transition-colors hover:border-signal hover:text-signal-bright"
          >
            Resume
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded border border-graphite-600 px-5 py-2.5 font-body text-sm text-graphite-50 transition-colors hover:border-signal hover:text-signal-bright"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
