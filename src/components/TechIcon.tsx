
import * as SimpleIcons from "simple-icons";

type TechIconProps = {
  name: string;
  compact?: boolean;
};

// Resolve the official Simple Icons export by its brand name.
function getIcon(name: string) {
  const normalized = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const aliases: Record<string, string> = {
    javascript: "siJavascript",
    cplusplus: "siCplusplus",
    "c/c++": "siCplusplus",
    scikitlearn: "siScikitlearn",
    opencv: "siOpencv",
    nodejs: "siNodedotjs",
    express: "siExpress",
    nextjs: "siNextdotjs",
    nestjs: "siNestjs",
    postgresql: "siPostgresql",
    tailwindcss: "siTailwindcss",
    pytorch: "siPytorch",
    numpy: "siNumpy",
    pandas: "siPandas",
    matplotlib: "siMatplotlib",
    typescript: "siTypescript",
    react: "siReact",
    python: "siPython",
    java: "siJava",
    git: "siGit",
    github: "siGithub",
    streamlit: "siStreamlit",
    prisma: "siPrisma",
    vite: "siVite",
    jupyter: "siJupyter",
  };

  const exportName =
    aliases[normalized] ??
    `si${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;

  return (SimpleIcons as Record<string, any>)[exportName];
}

export function TechIcon({ name, compact = false }: TechIconProps) {
  const icon = getIcon(name);

  return (
    <div
      title={name}
      aria-label={name}
      role="img"
      className={`flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white ${
        compact ? "h-8 w-8 p-1.5" : "h-14 w-14 p-3"
      }`}
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          className="h-full w-full"
          fill={`#${icon.hex}`}
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="text-xs font-bold text-slate-800">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default TechIcon;
