
import { useState } from "react";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  variant?: "featured" | "compact";
};

export default function ProjectCard({
  project,
  variant = "featured",
}: ProjectCardProps) {
  const [showPipeline, setShowPipeline] = useState(false);

  const isCompact = variant === "compact";
  const isChurnProject = project.slug === "churn-prediction";

  return (
    <article
      className={`group rounded-xl border transition duration-300 ${
        isCompact ? "p-4" : "p-6"
      } ${
        isChurnProject
          ? "border-cyan-400/50 bg-slate-900/70 shadow-lg shadow-cyan-500/5 hover:border-cyan-300"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3
          className={`font-semibold leading-snug text-white ${
            isCompact ? "text-base" : "text-lg"
          }`}
        >
          {project.name}
        </h3>

        {project.featured && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-300">
            <Star size={12} aria-hidden="true" />
            Featured
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-400">
        {project.problem}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        {project.built}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((technology) => (
          <span
            key={technology}
            className="rounded border border-slate-700 bg-slate-950/60 px-2 py-1 font-mono text-xs text-slate-300"
          >
            {technology}
          </span>
        ))}
      </div>

      {project.result && (
        <p className="mt-4 text-sm font-semibold text-cyan-300">
          {project.result}
          {project.resultConfidence === "ESTIMATE" && (
            <span className="ml-2 text-xs font-normal text-slate-500">
              (estimate)
            </span>
          )}
        </p>
      )}

      {project.pipeline && project.pipeline.length > 0 && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setShowPipeline((visible) => !visible)}
            aria-expanded={showPipeline}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {showPipeline ? "Hide pipeline" : "View pipeline"}
            {showPipeline ? (
              <ChevronUp size={16} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} aria-hidden="true" />
            )}
          </button>

          {showPipeline && (
            <ol className="mt-4 space-y-2 border-l border-slate-700 pl-4">
              {project.pipeline.map((step, index) => (
                <li
                  key={`${index}-${step}`}
                  className="relative text-sm text-slate-300"
                >
                  <span
                    className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-cyan-400"
                    aria-hidden="true"
                  />
                  {step}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {(project.demo || project.github) && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo for ${project.name}`}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-300/10 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-lg hover:shadow-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Live Demo
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.name} on GitHub`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Github size={16} aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      )}
    </article>
  );
}
