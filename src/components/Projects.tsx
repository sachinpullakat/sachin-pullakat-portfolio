
import { useState } from "react";
import { projects } from "../data/projects";

type ProjectStory = {
  category: string;
  situation: string;
  solution: string;
  highlights: string[];
  image: string;
};

const projectStories: Record<string, ProjectStory> = {
  "wildlife-threat-detection": {
    category: "AI / COMPUTER VISION",
    situation:
      "Camouflaged animals can disappear into dense forest environments, making surveillance footage difficult to interpret and continuous monitoring challenging.",
    solution:
      "Combines camouflage segmentation, object detection, multi-object tracking, movement analysis, and depth estimation to support wildlife monitoring and potential risk-event detection.",
    highlights: [
      "Camouflage-aware image segmentation",
      "YOLOv8 detection and DeepSORT tracking",
      "Optical flow and depth estimation",
    ],
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
  },

  "ai-communication-copilot": {
    category: "GENERATIVE AI / BACKEND",
    situation:
      "Enterprise communication is repetitive, but unstructured AI automation can produce inconsistent responses, unsupported claims, and limited visibility into how outputs are generated.",
    solution:
      "Structures AI-assisted communication around prompt orchestration, context retrieval, guardrails, response streaming, and observability.",
    highlights: [
      "Retrieval-augmented generation",
      "Six-stage prompt orchestration",
      "Guardrails and response observability",
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  },

  "hiring-assessment-platform": {
    category: "FULL-STACK / SYSTEM DESIGN",
    situation:
      "Hiring teams need consistent candidate assessments while managing permissions, question changes, evaluation workflows, and reporting across organizations.",
    solution:
      "A multi-tenant assessment platform with authentication, role-based access control, question versioning, candidate evaluation, analytics, and PDF reporting.",
    highlights: [
      "Multi-tenant application architecture",
      "JWT authentication and RBAC",
      "Assessment workflows and reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
  },

  "churn-prediction": {
    category: "MACHINE LEARNING / ANALYTICS",
    situation:
      "Customer disengagement can go unnoticed until retention becomes difficult. Historical customer data can help identify patterns associated with churn.",
    solution:
      "Builds a machine-learning workflow using data preprocessing, feature engineering, and Random Forest classification to estimate customer churn risk.",
    highlights: [
      "Data cleaning and preprocessing",
      "Feature engineering",
      "Random Forest classification",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
  },
};

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
    >
      {diagonal ? (
        <path
          d="M7 17 17 7M8 7h9v9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ProjectVisual({
  image,
  title,
  index,
}: {
  image: string;
  title: string;
  index: number;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="group/visual relative min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0d12] sm:min-h-[340px] lg:min-h-[390px]">
      {!imageFailed && (
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 ease-out group-hover/visual:scale-[1.045] group-hover/visual:opacity-85"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080a0f]/25 to-transparent" />

      <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
        <span className="font-mono text-[11px] tracking-[0.18em] text-white/75">
          SELECTED WORK / {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
        <div className="mb-4 h-px w-9 bg-cyan-300/90 transition-all duration-300 group-hover/visual:w-16" />
        <h3 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="relative px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.23em] text-cyan-400">
              Selected work
            </p>

            <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Engineering with
              <span className="block text-white/40">purpose.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              Practical problems. Thoughtful engineering. Systems designed
              around the way people actually work.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/45">
            <span className="h-px w-8 bg-white/25" />
            {String(projects.length).padStart(2, "0")} projects
          </div>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => {
            const story = projectStories[project.slug];

            if (!story) return null;

            const expanded = expandedProject === project.slug;

            return (
              <article
                key={project.slug}
                className="rounded-3xl border border-white/[0.09] bg-white/[0.02] p-3 transition-colors duration-300 hover:border-white/[0.17] sm:p-5 lg:p-6"
              >
                <div className="grid items-center gap-6 lg:grid-cols-[1fr_0.92fr] lg:gap-9">
                  <ProjectVisual
                    image={story.image}
                    title={project.name}
                    index={index}
                  />

                  <div className="flex min-w-0 flex-col py-3 sm:px-2 lg:py-5">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.19em] text-cyan-400 sm:text-xs">
                      {story.category}
                    </p>

                    <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                      {project.name}
                    </h3>

                    <div className="mt-6">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                        The challenge
                      </p>

                      <p className="text-sm leading-7 text-white/65">
                        {story.situation}
                      </p>
                    </div>

                    <div className="mt-5">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                        The approach
                      </p>

                      <p className="text-sm leading-7 text-white/80">
                        {story.solution}
                      </p>
                    </div>

                    {project.result && (
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="text-lg font-semibold tracking-tight text-white">
                          {project.result}
                        </span>

                        {project.resultConfidence === "VERIFIED" && (
                          <span className="rounded-full border border-emerald-400/20 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-emerald-300">
                            Verified
                          </span>
                        )}

                        {project.resultConfidence === "ESTIMATE" && (
                          <span className="rounded-full border border-amber-400/20 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-amber-300">
                            Reported
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[11px] text-white/65"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.09] pt-5">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          Source code
                          <ArrowIcon diagonal />
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        >
                          Live demo
                          <ArrowIcon diagonal />
                        </a>
                      )}

                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() =>
                          setExpandedProject(
                            expanded ? null : project.slug,
                          )
                        }
                        className="ml-auto inline-flex items-center gap-2 rounded-lg py-2 text-xs font-medium text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                      >
                        {expanded ? "Close details" : "Technical details"}

                        <span
                          aria-hidden="true"
                          className={`inline-block transition-transform duration-200 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        >
                          ↓
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {expanded && (
                  <div className="mt-6 grid gap-8 border-t border-white/[0.09] px-2 py-6 sm:grid-cols-2 sm:px-3">
                    <div>
                      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                        Engineering highlights
                      </p>

                      <ul className="space-y-3">
                        {story.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-3 text-sm leading-6 text-white/70"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                        Technology stack
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-white/70"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>

                      {project.pipeline && project.pipeline.length > 0 && (
                        <div className="mt-6">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                            Workflow
                          </p>

                          <ol className="space-y-3">
                            {project.pipeline.map((step, stepIndex) => (
                              <li
                                key={`${project.slug}-${step}`}
                                className="flex items-start gap-3 text-sm leading-6 text-white/65"
                              >
                                <span className="font-mono text-xs text-cyan-400/80">
                                  {String(stepIndex + 1).padStart(2, "0")}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
