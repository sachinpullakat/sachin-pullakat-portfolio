import { useEffect, useState } from "react";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import { shortcutLabel } from "../lib/commands";
import { usePalette } from "../lib/palette";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { show } = usePalette();
  const shortcut = shortcutLabel();

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((element): element is Element => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible[0]) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#090b10]/80 backdrop-blur-2xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6"
      >
        <a
          href="#top"
          onClick={closeMenu}
          className="focus-ring group inline-flex items-center gap-3 rounded"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/25 bg-blue-400/10 font-display text-sm font-bold tracking-tight text-blue-300 transition-colors group-hover:border-blue-300/50 group-hover:bg-blue-400/15">
            SP
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-slate-100 sm:block">
            Sachin Pullakat Santosh
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-slate-100 sm:hidden">
            Sachin.
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "location" : undefined}
                className={`focus-ring rounded text-[13px] transition-colors ${
                  active === link.href
                    ? "text-blue-300"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={show}
            aria-haspopup="dialog"
            aria-keyshortcuts={shortcut === "⌘K" ? "Meta+K" : "Control+K"}
            aria-label={`Open command palette (${shortcut})`}
            className="focus-ring inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-slate-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <Command size={15} aria-hidden="true" />
            <span className="hidden text-xs sm:inline">Search</span>
            <kbd className="hidden rounded border border-white/10 bg-black/20 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 lg:inline">
              {shortcut}
            </kbd>
          </button>

          <a
            href={profile.resumePath}
            target="_blank"
            rel="noreferrer"
            className="focus-ring hidden items-center gap-1.5 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-white sm:inline-flex"
          >
            Résumé
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:bg-white/[0.06] md:hidden"
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/[0.07] bg-[#090b10]/95 px-6 py-4 backdrop-blur-2xl md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active === link.href ? "location" : undefined}
                  className={`focus-ring block rounded-lg px-3 py-3 text-sm transition-colors ${
                    active === link.href
                      ? "bg-blue-400/10 text-blue-300"
                      : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}

            <li className="mt-2 border-t border-white/[0.07] pt-3">
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="focus-ring inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-blue-300"
              >
                View résumé
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}