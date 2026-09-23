import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-graphite-700/60 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-2xl font-semibold text-graphite-50">Technical Skills</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.category}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-graphite-400">{g.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="rounded border border-graphite-600 px-2.5 py-1 font-body text-sm text-graphite-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
