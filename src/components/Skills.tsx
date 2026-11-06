
import { skillGroups } from "../data/skills";
import TechIcon from "./TechIcon";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-white/[0.07] px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-cyan-400/[0.035] blur-[100px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.025] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.23em] text-cyan-400">
            My toolkit
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Technologies I
            <span className="block text-white/40">work with.</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
            Languages, frameworks, and tools I use to build software,
            machine learning systems, and practical applications.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="group/card rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.035] sm:p-6"
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65 transition-colors group-hover/card:text-cyan-200">
                  {group.category}
                </h3>

                <span className="font-mono text-[10px] text-white/30">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-x-2 gap-y-6">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="group flex min-w-0 flex-col items-center gap-2.5 text-center"
                    title={item}
                  >
                    <TechIcon name={item} />

                    <span className="max-w-full break-words text-[10px] leading-4 text-white/55 transition-colors duration-300 group-hover:text-cyan-200 sm:text-[11px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
