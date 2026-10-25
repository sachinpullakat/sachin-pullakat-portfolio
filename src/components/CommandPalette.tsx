import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { commands, filterCommands, GROUP_ORDER } from "../lib/commands";
import type { Command } from "../lib/commands";
import { usePalette } from "../lib/palette";
import { useReducedMotion } from "../lib/useReducedMotion";

// Accessible command palette (WAI-ARIA "combobox with listbox popup" pattern):
//  - Ctrl/Cmd+K toggles it from anywhere; the nav button opens the same instance.
//  - Focus stays in the input; arrow keys move `aria-activedescendant` through the options.
//  - Modal: the rest of the page is made `inert`, Tab is trapped, Esc closes, and focus
//    returns to whatever opened it (unless the command moved focus itself).

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-graphite-600 bg-graphite-800 px-1.5 py-0.5 font-mono text-[11px] text-graphite-200">
      {children}
    </kbd>
  );
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const reducedMotion = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const listId = `cmdk-list-${uid}`;
  const optionId = (commandId: string) => `cmdk-opt-${uid}-${commandId}`;

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [feedback, setFeedback] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(document.activeElement as HTMLElement | null);
  const skipRestore = useRef(false);
  const busy = useRef(false);
  const timer = useRef<number>();

  const results = useMemo(() => filterCommands(commands, query), [query]);
  const groups = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({ group, items: results.filter((c) => c.group === group) })).filter(
        (g) => g.items.length > 0,
      ),
    [results],
  );
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const activeIndex = Math.min(active, Math.max(flat.length - 1, 0));
  const activeCommand: Command | undefined = flat[activeIndex];

  // Lock page scroll and hide the page from assistive tech / tab order while open.
  useEffect(() => {
    const root = document.getElementById("root");
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`; // avoid layout shift
    root?.setAttribute("inert", "");
    inputRef.current?.focus();

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      root?.removeAttribute("inert");
      window.clearTimeout(timer.current);
      if (!skipRestore.current) opener.current?.focus?.();
    };
  }, []);

  // Keep the highlighted option visible when navigating with the keyboard.
  useEffect(() => {
    if (activeCommand) {
      document.getElementById(optionId(activeCommand.id))?.scrollIntoView({ block: "nearest" });
    }
    // optionId is derived from the stable uid, so it is intentionally not a dependency.
  }, [activeCommand]);

  const execute = useCallback(
    async (command: Command) => {
      if (busy.current) return;
      const opts = { smooth: !reducedMotion };

      if (command.kind === "scroll") {
        // Close first (restores scroll + removes inert), then navigate and move focus.
        busy.current = true;
        skipRestore.current = true;
        onClose();
        requestAnimationFrame(() => {
          void command.run(opts);
        });
        return;
      }

      if (command.kind === "external") {
        // Must run synchronously inside the user's click/Enter so popups are allowed.
        void command.run(opts);
        onClose();
        return;
      }

      busy.current = true;
      const message = await command.run(opts);
      setFeedback(typeof message === "string" ? message : "Done");
      timer.current = window.setTimeout(onClose, 1100);
    },
    [onClose, reducedMotion],
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActive(0);
  };

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    const n = flat.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (n) setActive((activeIndex + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (n) setActive((activeIndex - 1 + n) % n);
    } else if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (activeCommand) void execute(activeCommand);
    }
  };

  // Esc closes; Tab cycles between the input and the Close button only.
  const onDialogKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key === "Tab") {
      const first = inputRef.current;
      const last = closeRef.current;
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const countLabel = `${flat.length} ${flat.length === 1 ? "result" : "results"}`;

  return (
    <div
      className="cmdk-overlay fixed inset-0 z-50 flex items-start justify-center bg-graphite-950/70 px-4 pt-[10vh] backdrop-blur-sm sm:pt-[14vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={onDialogKeyDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="cmdk-panel w-full max-w-xl overflow-hidden rounded-lg border border-graphite-600 bg-graphite-900 shadow-2xl shadow-black/60"
      >
        <div className="flex items-center gap-3 border-b border-graphite-700 px-4 focus-within:border-signal/60">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-graphite-400">
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={flat.length ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={activeCommand ? optionId(activeCommand.id) : undefined}
            aria-label="Search sections, projects and links"
            placeholder="Search sections, projects, links…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            value={query}
            onChange={onChange}
            onKeyDown={onInputKeyDown}
            className="h-14 w-full bg-transparent font-body text-base text-graphite-50 placeholder:text-graphite-400 focus:outline-none"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="focus-ring shrink-0 rounded border border-graphite-600 px-2 py-1 font-mono text-[11px] text-graphite-200 transition-colors hover:border-signal hover:text-signal-bright"
          >
            Esc
          </button>
        </div>

        {flat.length > 0 ? (
          <div
            id={listId}
            role="listbox"
            aria-label="Commands"
            // Keep focus in the input when the pointer presses an option.
            onMouseDown={(e) => e.preventDefault()}
            className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2"
          >
            {groups.map(({ group, items }) => {
              const headingId = `${listId}-${group}`;
              return (
                <div key={group} role="group" aria-labelledby={headingId} className="py-1">
                  <div
                    id={headingId}
                    className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-wider text-graphite-400"
                  >
                    {group}
                  </div>
                  {items.map((c) => {
                    const index = flat.indexOf(c);
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={c.id}
                        id={optionId(c.id)}
                        role="option"
                        aria-selected={isActive}
                        onMouseMove={() => {
                          if (index !== activeIndex) setActive(index);
                        }}
                        onClick={() => void execute(c)}
                        className={`flex cursor-pointer items-center justify-between gap-4 rounded border-l-2 px-3 py-2.5 font-body text-sm transition-colors ${
                          isActive
                            ? "border-signal bg-graphite-800 text-graphite-50"
                            : "border-transparent text-graphite-200"
                        }`}
                      >
                        <span className="truncate">{c.label}</span>
                        {c.hint && (
                          <span className="max-w-[50%] shrink-0 truncate font-mono text-xs text-graphite-400">
                            {c.hint}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="px-3 py-8 text-center font-body text-sm text-graphite-400">
            No matches for “{query.trim()}”
          </p>
        )}

        <div className="flex items-center justify-between gap-4 border-t border-graphite-700 px-4 py-2.5 font-body text-xs text-graphite-400">
          <span role="status" aria-live="polite" className="truncate">
            {feedback || countLabel}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span className="mr-2">navigate</span>
            <Kbd>↵</Kbd>
            <span>open</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CommandPalette() {
  const { open, hide, toggle } = usePalette();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.isComposing) return;
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k") {
        e.preventDefault(); // stops the browser's own Ctrl+K (search-bar focus)
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return open ? createPortal(<PaletteDialog onClose={hide} />, document.body) : null;
}
