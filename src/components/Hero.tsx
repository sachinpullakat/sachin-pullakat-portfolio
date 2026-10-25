
import { profile } from "../data/profile";
import HeroBackdrop from "./HeroBackdrop";

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
    <section
      id="top"
      className="relative isolate overflow-hidden px-6 py-10 sm:py-14 lg:py-16"
    >
      <HeroBackdrop />

      <div className="relative z-10 mx-auto grid min-h-[440px] max-w-6xl items-center gap-8 sm:min-h-[460px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-4">
        {/* Introduction and actions */}
        <div className="relative z-20 min-w-0">
          <div className="relative px-5 py-6 sm:px-8 sm:py-8">
            <Bracket className="left-0 top-0 border-l-2 border-t-2" />
            <Bracket className="right-0 top-0 border-r-2 border-t-2" />
            <Bracket className="bottom-0 left-0 border-b-2 border-l-2" />
            <Bracket className="bottom-0 right-0 border-b-2 border-r-2" />

            <p className="font-mono text-xs uppercase tracking-[0.16em] text-signal-bright">
              {profile.focus}
            </p>

            <h1 className="mt-5 max-w-none font-display text-4xl font-semibold leading-[1.08] tracking-tight text-graphite-50 sm:text-5xl lg:whitespace-nowrap lg:text-[3.35rem] xl:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-graphite-200 sm:text-lg sm:leading-8">
              {profile.heroSupport}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="focus-ring rounded bg-signal px-5 py-3 text-sm font-medium text-graphite-950 transition-colors hover:bg-signal-bright"
            >
              View Projects
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded border border-graphite-600 px-5 py-3 text-sm text-graphite-50 transition-colors hover:border-signal hover:text-signal-bright"
            >
              GitHub
            </a>

            <a
              href={profile.resumePath}
              className="focus-ring rounded border border-graphite-600 px-5 py-3 text-sm text-graphite-50 transition-colors hover:border-signal hover:text-signal-bright"
            >
              Resume
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded border border-graphite-600 px-5 py-3 text-sm text-graphite-50 transition-colors hover:border-signal hover:text-signal-bright"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Dedicated space for the 3D visual */}
        <div
          aria-hidden="true"
          className="hidden min-h-[340px] lg:block"
        />
      </div>
    </section>
  );
}
