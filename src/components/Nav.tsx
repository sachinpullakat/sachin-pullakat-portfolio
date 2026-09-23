import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-graphite-700/60 bg-graphite-950/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight text-graphite-50 focus-ring rounded">
          Sachin Pullakat Santosh
        </a>
        <ul className="hidden gap-8 font-body text-sm sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "true" : undefined}
                className={`transition-colors focus-ring rounded ${
                  active === l.href ? "text-signal-bright" : "text-graphite-200 hover:text-signal-bright"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={profile.resumePath}
            className="focus-ring hidden rounded border border-graphite-600 px-3 py-1.5 font-body text-sm text-graphite-50 transition-colors hover:border-signal hover:text-signal-bright sm:inline-block"
          >
            Resume
          </a>
          <button
            type="button"
            className="focus-ring rounded border border-graphite-600 p-2 text-graphite-50 sm:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-graphite-700/60 bg-graphite-950 px-6 py-3 sm:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded px-2 py-2 font-body text-sm focus-ring ${
                  active === l.href ? "text-signal-bright" : "text-graphite-200"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumePath}
              onClick={() => setMenuOpen(false)}
              className="block rounded px-2 py-2 font-body text-sm text-graphite-200 focus-ring"
            >
              Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
