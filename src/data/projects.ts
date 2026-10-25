
export type Project = {
  slug: string;
  name: string;
  problem: string;
  built: string;
  stack: string[];
  pipeline?: string[];
  result?: string; // only set when a real, verified number exists
  resultConfidence?: "VERIFIED" | "ESTIMATE";
  github?: string;
  demo?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "wildlife-threat-detection",
    name: "Camouflage-Aware AI Wildlife Threat Detection",
    problem:
      "Camouflaged animals near forest boundaries are hard to detect with standard object detection, creating risk for wildlife monitoring and human-wildlife conflict prevention.",
    built:
      "A real-time surveillance pipeline that segments camouflaged subjects, detects and tracks them across frames, and estimates distance to flag threat-level events. 7th-semester main project.",
    stack: [
      "U-Net",
      "YOLOv8",
      "DeepSORT",
      "Optical Flow",
      "ZoeDepth",
      "Python",
      "OpenCV",
    ],
    pipeline: [
      "Input video",
      "Camouflage segmentation (U-Net)",
      "YOLOv8 detection",
      "DeepSORT tracking",
      "Optical flow / movement analysis",
      "ZoeDepth distance estimation",
      "Threat-level flagging",
    ],
    featured: true,
  },
  {
    slug: "ai-communication-copilot",
    name: "Enterprise AI Communication Copilot",
    problem:
      "Enterprise email communication is repetitive and error-prone to automate safely — naive LLM wrappers hallucinate and have no observability.",
    built:
      "A production-oriented copilot with a 6-stage prompt orchestration pipeline, retrieval-augmented generation, guardrails, self-evaluation, streaming responses, and observability for enterprise email automation.",
    stack: [
      "Node.js",
      "Express",
      "Claude API",
      "RAG",
      "Prompt orchestration",
      "Streaming",
    ],
    pipeline: [
      "User request",
      "API layer",
      "Prompt orchestration (6 stages)",
      "Context retrieval (RAG)",
      "Claude API",
      "Guardrails & self-evaluation",
      "Streamed response",
      "Analytics / observability",
    ],
    github:
      "https://github.com/sachinpullakat/ai-communication-copilot",
    featured: true,
  },
  {
    slug: "hiring-assessment-platform",
    name: "Enterprise Hiring Assessment Platform",
    problem:
      "Hiring teams need multi-tenant assessment tooling with real access control and auditability, not a single-tenant CRUD app.",
    built:
      "A full-stack multi-tenant hiring assessment platform with JWT authentication, role-based access control, immutable question versioning, automated assessment generation, candidate evaluation, manual review, analytics, and PDF reporting.",
    stack: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "JWT",
      "RBAC",
      "REST APIs",
    ],
    result: "143 REST APIs · 466+ unit tests",
    resultConfidence: "VERIFIED",
    github: "https://github.com/sachinpullakat/project",
    featured: true,
  },
  {
    slug: "churn-prediction",
    name: "ChurnIQ — Customer Churn Prediction & Retention Analytics",
    problem:
      "Identifying customers at risk of churn from historical behavioral data is challenging, making it difficult for businesses to prioritize retention efforts.",
    built:
      "An interactive, deployed machine-learning dashboard featuring customer segmentation, churn probability predictions, risk analysis, and retention insights. Includes a Threshold Optimization Lab with ROC curves, precision-recall analysis, confusion matrices, and threshold-based model evaluation.",
    stack: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Random Forest",
      "Streamlit",
      "Matplotlib",
      "Seaborn",
    ],
    pipeline: [
      "Customer data",
      "Data preprocessing",
      "Feature engineering",
      "Random Forest model",
      "Churn probability prediction",
      "Threshold optimization",
      "Customer risk analysis",
      "Retention insights",
    ],
    github: "https://github.com/sachinpullakat/Churn-project",
    demo:
      "https://churn-project-ef77w3gddbylexigerchn.streamlit.app/",
    featured: true,
  },
];
