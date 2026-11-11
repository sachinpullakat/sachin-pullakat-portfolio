
import { useState } from "react";

type TechIconProps = {
  name: string;
  compact?: boolean;
};

const iconSlugs: Record<string, string> = {
  python: "python",
  java: "java",
  javascript: "javascript",
  "c/c++": "cplusplus",

  pytorch: "pytorch",
  "scikit-learn": "scikitlearn",
  pandas: "pandas",
  numpy: "numpy",

  opencv: "opencv",

  "node.js": "nodedotjs",
  express: "express",
  "next.js": "nextdotjs",
  nestjs: "nestjs",

  postgresql: "postgresql",
  prisma: "prisma",

  git: "git",
  github: "github",
  jupyter: "jupyter",
  "google colab": "googlecolab",
  "claude api": "claude",
};

function getIconSlug(name: string) {
  return iconSlugs[name.toLowerCase().trim()];
}

export function TechIcon({
  name,
  compact = false,
}: TechIconProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const slug = getIconSlug(name);

  const size = compact ? "h-8 w-8 p-1.5" : "h-14 w-14 p-3";

  return (
    <div
      title={name}
      aria-label={name}
      role="img"
      className={`flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white ${size}`}
    >
      {slug && !imageFailed ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-xs font-bold tracking-tight text-slate-800">
          {name
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default TechIcon;
