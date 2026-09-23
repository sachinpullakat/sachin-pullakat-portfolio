import { achievements } from "../data/experience";

export default function Achievements() {
  return (
    <section id="achievements" className="border-t border-graphite-700/60 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-2xl font-semibold text-graphite-50">Achievements</h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.title} className="rounded border border-graphite-700 bg-graphite-900/40 p-4">
              <p className="font-body text-sm font-medium text-graphite-50">{a.title}</p>
              <p className="mt-1 font-body text-xs text-graphite-400">{a.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
