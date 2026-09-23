import { useState } from "react";
import type { Project } from "../data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`rounded-lg border border-graphite-700 bg-graphite-900/60 p-6 transition-colors ${
        project.featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-graphite-50">{project.name}</h3>
        {project.result && (
          <span
            className="rounded border border-signal/40 bg-signal/10 px-2 py-1 font-mono text-xs text-signal-bright"
            title={project.resultConfidence === "ESTIMATE" ? "Reported, not independently re-verified" : "Verified"}
          >
            {project.result}
          </span>
        )}
      </div>

      <p className="mt-3 font-body text-sm text-graphite-400">{project.problem}</p>
      <p className="mt-3 font-body text-sm text-graphite-200">{project.built}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <span key={t} className="rounded border border-graphite-600 px-2 py-1 font-mono text-xs text-graphite-200">
            {t}
          </span>
        ))}
      </div>

      {project.pipeline && (
        <div className="mt-5">
          <button
            onClick={() => setOpen((v) => !v)}
            className="focus-ring rounded font-body text-xs font-medium text-signal-bright transition-colors hover:text-signal-bright/80"
            aria-expanded={open}
          >
            {open ? "Hide pipeline ▲" : "View pipeline ▼"}
          </button>
          {open && (
            <ol className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-graphite-200">
              {project.pipeline.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded border border-graphite-600 bg-graphite-800 px-2 py-1">{step}</span>
                  {i < project.pipeline!.length - 1 && <span className="text-graphite-400">→</span>}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded font-body text-sm text-graphite-50 underline decoration-graphite-600 underline-offset-4 hover:decoration-signal-bright"
          >
            GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded font-body text-sm text-graphite-50 underline decoration-graphite-600 underline-offset-4 hover:decoration-signal-bright"
          >
            Demo
          </a>
        )}
      </div>
    </article>
  );
}
