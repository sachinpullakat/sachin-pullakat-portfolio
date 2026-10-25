import { profile } from "../data/profile";
import { projects } from "../data/projects";

// Every command is derived from data that already drives the page (profile,
// projects) or from the page's own section ids, so the palette cannot drift
// out of sync with the content or link to something that does not exist.

export type CommandGroup = "Sections" | "Projects" | "Links";
export const GROUP_ORDER: CommandGroup[] = ["Sections", "Projects", "Links"];

/**
 * scroll   – in-page navigation. The palette closes first, then scrolls and moves focus.
 * external – opens a link/mailto. Runs synchronously inside the click/Enter handler
 *            so browsers treat it as user-initiated (popup blockers).
 * copy     – clipboard action. Runs while the palette is open and reports back a message.
 */
export type CommandKind = "scroll" | "external" | "copy";

export type RunOptions = { smooth: boolean };

export type Command = {
  id: string;
  label: string;
  hint?: string;
  group: CommandGroup;
  keywords: string[];
  kind: CommandKind;
  run: (opts: RunOptions) => void | string | Promise<string>;
};

/** Scrolls to an element by id, updates the URL hash, and moves keyboard focus there. */
export function scrollToId(id: string, smooth: boolean): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  history.replaceState(null, "", `#${id}`);
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

const sections: { id: string; label: string; keywords: string[] }[] = [
  { id: "top", label: "Top", keywords: ["home", "hero", "start"] },
  { id: "about", label: "About", keywords: ["bio", "summary"] },
  { id: "projects", label: "Projects", keywords: ["work", "portfolio"] },
  { id: "experience", label: "Experience", keywords: ["internships", "jobs", "work"] },
  { id: "skills", label: "Skills", keywords: ["technical", "stack", "tools"] },
  { id: "education", label: "Education", keywords: ["degree", "ksit", "certifications", "courses"] },
  { id: "achievements", label: "Achievements", keywords: ["awards", "sports"] },
  { id: "contact", label: "Contact", keywords: ["email", "reach", "hire"] },
];

const open = (url: string) => () => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const commands: Command[] = [
  ...sections.map<Command>((s) => ({
    id: `section-${s.id}`,
    label: s.label,
    group: "Sections",
    keywords: s.keywords,
    kind: "scroll",
    run: ({ smooth }) => scrollToId(s.id, smooth),
  })),

  ...projects.map<Command>((p) => ({
    id: `project-${p.slug}`,
    label: p.name,
    group: "Projects",
    keywords: ["project", ...p.stack],
    kind: "scroll",
    run: ({ smooth }) => scrollToId(`project-${p.slug}`, smooth),
  })),

  {
    id: "link-resume",
    label: "Resume",
    hint: "PDF ↗",
    group: "Links",
    keywords: ["cv", "download", "pdf"],
    kind: "external",
    run: open(profile.resumePath),
  },
  {
    id: "link-github",
    label: "GitHub profile",
    hint: "↗",
    group: "Links",
    keywords: ["code", "repositories", "repos", "source"],
    kind: "external",
    run: open(profile.github),
  },
  {
    id: "link-linkedin",
    label: "LinkedIn",
    hint: "↗",
    group: "Links",
    keywords: ["profile", "connect", "network"],
    kind: "external",
    run: open(profile.linkedin),
  },
  {
    id: "link-email",
    label: "Send email",
    hint: profile.email,
    group: "Links",
    keywords: ["mail", "contact", "message", "hire"],
    kind: "external",
    run: () => {
      window.location.href = `mailto:${profile.email}`;
    },
  },
  {
    id: "action-copy-email",
    label: "Copy email address",
    hint: "Clipboard",
    group: "Links",
    keywords: ["mail", "clipboard", "contact"],
    kind: "copy",
    run: async () => {
      try {
        await navigator.clipboard.writeText(profile.email);
        return "Email address copied";
      } catch {
        // Clipboard can be unavailable (insecure context, denied permission).
        return "Couldn't copy — use “Send email” instead";
      }
    },
  },

  ...projects
    .filter((p) => p.github)
    .map<Command>((p) => ({
      id: `repo-${p.slug}`,
      label: `Source code — ${p.name}`,
      hint: "GitHub ↗",
      group: "Links",
      keywords: ["github", "repo", "repository", "source", "code"],
      kind: "external",
      run: open(p.github as string),
    })),
];

// --- Filtering -------------------------------------------------------------

function scoreToken(label: string, keywords: string, token: string): number {
  if (label.startsWith(token)) return 100;
  if (label.split(/[^a-z0-9]+/).some((w) => w.startsWith(token))) return 70;
  if (label.includes(token)) return 40;
  if (keywords.split(/\s+/).some((w) => w.startsWith(token))) return 30;
  if (keywords.includes(token)) return 15;
  return 0;
}

/** Ranks commands by every whitespace-separated token matching label, then keywords. */
export function filterCommands(list: Command[], query: string): Command[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return list;

  return list
    .map((command, index) => {
      const label = command.label.toLowerCase();
      const keywords = command.keywords.join(" ").toLowerCase();
      let total = 0;
      for (const token of tokens) {
        const s = scoreToken(label, keywords, token);
        if (s === 0) return { command, index, score: 0 };
        total += s;
      }
      return { command, index, score: total };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((r) => r.command);
}

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere. */
export function shortcutLabel(): string {
  const isApple = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  return isApple ? "⌘K" : "Ctrl K";
}
