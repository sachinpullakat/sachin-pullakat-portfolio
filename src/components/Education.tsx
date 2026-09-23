import { education } from "../data/education";
import { certifications } from "../data/experience";

export default function Education() {
  return (
    <section id="education" className="border-t border-graphite-700/60 px-6 py-16">
      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-graphite-50">Education</h2>
          <div className="mt-6 space-y-5">
            {education.map((e) => (
              <div key={e.school}>
                <p className="font-body text-sm text-graphite-400">{e.year}</p>
                <h3 className="font-display text-base font-semibold text-graphite-50">{e.credential}</h3>
                <p className="font-body text-sm text-graphite-200">{e.school}</p>
                <p className="font-body text-sm text-graphite-400">{e.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-graphite-50">Certifications</h2>
          <ul className="mt-6 space-y-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="font-body text-sm font-medium text-graphite-50">{c.name}</p>
                <p className="font-body text-sm text-graphite-400">{c.issuer}</p>
                {c.url && (
                  <a href={c.url} className="font-body text-sm text-signal-bright underline underline-offset-4">
                    View credential
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
