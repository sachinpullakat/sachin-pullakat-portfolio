
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Code2,
  Network,
} from "lucide-react";
import { profile } from "../data/profile";
import HeroBackdrop from "./HeroBackdrop";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden px-6 py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-blue-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-[15%] h-64 w-64 rounded-full bg-indigo-500/[0.06] blur-[110px]" />
      </div>

      <HeroBackdrop />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6">
        <div className="relative max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 sm:text-xs">
              {profile.role}
            </span>
          </div>

          <p className="section-kicker mb-5">
            {profile.focus}
          </p>

          <h1 className="max-w-4xl font-display text-[clamp(3.1rem,8vw,6.8rem)] font-semibold leading-[0.98] tracking-[-0.075em] text-white">
            Sachin
            <br />
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              Pullakat Santosh.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
            {profile.heroSupport}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="focus-ring group inline-flex items-center gap-3 rounded-lg bg-blue-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-300"
            >
              Explore my work
              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.035] px-5 py-3.5 text-sm font-medium text-slate-200 transition duration-200 hover:border-white/30 hover:bg-white/[0.07]"
            >
              <FileText size={16} aria-hidden="true" />
              View resume
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded text-sm text-slate-400 transition-colors hover:text-white"
            >
              <Code2 size={16} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded text-sm text-slate-400 transition-colors hover:text-white"
            >
              <Network size={16} aria-hidden="true" />
              LinkedIn
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>

            <span className="hidden h-4 w-px bg-white/15 sm:block" />

            <span className="font-mono text-[11px] tracking-wide text-slate-500">
              {profile.location}
            </span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hidden min-h-[400px] lg:block"
        />
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="focus-ring absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-slate-200 lg:flex"
      >
        <span>Scroll to explore</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
