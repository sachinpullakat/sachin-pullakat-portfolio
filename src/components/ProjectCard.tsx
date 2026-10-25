
import { useState } from "react";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  variant?: "featured" | "compact";
};

export default function ProjectCard({
  project,
  variant = "featured",
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const compact = variant === "compact";

  return (
    <article
      id={`project-${project.slug}`}
      className={`flex h-full flex-col rounded-xl border border-graphite-700 bg-graphite-900/50 transition-colors duration-200 hover:border-graphite-500 ${
        compact ? "p-5 sm:p-6" : "p-6"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-xl font-display text-lg font-semibold leading-snug text-graphite-50">
          {project.name}
        </h3>

        {project.result && (
          <span
            className="rounded border border-signal/40 bg-signal/10 px-2 py-1 font-mono text-xs text-signal-bright"
            title={
              project.resultConfidence === "ESTIMATE"
                ? "Reported estimate; not independently re-verified"
                : "Reported as verified in the project data"
            }
          >
            {project.result}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-6 text-graphite-400">
        {project.problem}
      </p>

      <p className="mt-3 text-sm leading-6 text-graphite-200">
        {project.built}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((technology) => (
          <span
            key={technology}
            className="rounded-md border border-graphite-700 bg-graphite-950/60 px-2.5 py-1 font-mono text-[11px] text-graphite-300"
          >
            {technology}
          </span>
        ))}
      </div>

      {project.pipeline && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="focus-ring rounded text-sm font-medium text-signal-bright transition-colors hover:text-graphite-50"
            aria-expanded={open}
          >
            {open ? "Hide system pipeline −" : "Explore system pipeline +"}
          </button>

          {open && (
            <ol className="mt-4 space-y-2 border-l border-graphite-700 pl-4">
              {project.pipeline.map((step, index) => (
                <li key={`${step}-${index}`} className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-[11px] text-signal-bright">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-5 text-graphite-200">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded text-sm font-medium text-graphite-50 underline decoration-graphite-600 underline-offset-4 hover:decoration-signal-bright"
          >
            GitHub ↗
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded text-sm font-medium text-graphite-50 underline decoration-graphite-600 underline-offset-4 hover:decoration-signal-bright"
          >
            Live demo ↗
          </a>
        )}
      </div>
    </article>
  );
}
