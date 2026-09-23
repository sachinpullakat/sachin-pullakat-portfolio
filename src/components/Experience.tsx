import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-graphite-700/60 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-2xl font-semibold text-graphite-50">Experience</h2>
        <div className="mt-8 space-y-6 border-l-2 border-graphite-700 pl-6">
          {experience.map((e) => (
            <div key={e.company} className="relative">
              <span
                className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-signal"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-graphite-400">{e.duration}</p>
              <h3 className="mt-1 font-display text-base font-semibold text-graphite-50">{e.role}</h3>
              <p className="font-body text-sm text-graphite-200">{e.company}</p>
              {e.detail && <p className="mt-2 font-body text-sm text-graphite-400">{e.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
