import { stats } from "../data/profile";

export default function Stats() {
  return (
    <section className="border-y border-graphite-700/60 bg-graphite-900/40 px-6 py-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-lg font-semibold text-graphite-50 sm:text-xl">{s.label}</p>
            <p className="mt-1 font-body text-xs text-graphite-400">{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
