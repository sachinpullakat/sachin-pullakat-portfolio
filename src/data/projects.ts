
export type Project = {
  slug: string;
  name: string;
  problem: string;
  built: string;
  stack: string[];
  pipeline?: string[];
  result?: string;
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
      "Camouflaged animals can blend into forest backgrounds, making them difficult to detect with conventional object detection alone. Wildlife monitoring systems need to combine visual understanding, temporal tracking, movement analysis, and depth estimation to assess potential threats.",
    built:
      "An end-to-end computer vision pipeline combining camouflage segmentation, object detection, multi-object tracking, movement analysis, and monocular depth estimation. The architecture connects these components to support threat-level flagging for wildlife monitoring and human-wildlife conflict prevention.",
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
      "U-Net — camouflage-aware segmentation",
      "YOLOv8 — object detection",
      "DeepSORT — cross-frame object tracking",
      "Optical flow — movement analysis",
      "ZoeDepth — monocular depth estimation",
      "Threat-level flagging",
    ],
    github:
      "https://github.com/sachinpullakat/camouflage-aware-wildlife-detection",
    featured: true,
  },

  {
    slug: "ai-communication-copilot",
    name: "Enterprise AI Communication Copilot",
    problem:
      "Enterprise email communication is repetitive and error-prone to automate safely. Basic LLM integrations can produce unreliable outputs without context retrieval, guardrails, and observability.",
    built:
      "A production-oriented AI communication copilot featuring a six-stage prompt orchestration pipeline, retrieval-augmented generation, guardrails, self-evaluation, streaming responses, and observability for enterprise email automation.",
    stack: [
      "Node.js",
      "Express",
      "Claude API",
      "RAG",
      "Prompt Orchestration",
      "Streaming",
    ],
    pipeline: [
      "User request",
      "API layer",
      "Six-stage prompt orchestration",
      "Context retrieval (RAG)",
      "Claude API",
      "Guardrails and self-evaluation",
      "Streamed response",
      "Analytics and observability",
    ],
    github:
      "https://github.com/sachinpullakat/ai-communication-copilot",
    featured: true,
  },

  {
    slug: "hiring-assessment-platform",
    name: "Enterprise Hiring Assessment Platform",
    problem:
      "Hiring teams need multi-tenant assessment tooling with robust access control and auditability, rather than a basic single-tenant CRUD application.",
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
      "Customer churn is difficult to anticipate from historical behavior. Businesses need to identify at-risk customers and understand how prediction thresholds affect retention decisions.",
    built:
      "Developed and deployed an interactive churn analytics dashboard powered by a Random Forest classifier. Includes customer segmentation, probability-based risk predictions, retention insights, and a Threshold Optimization Lab with ROC curves, precision-recall analysis, confusion matrices, and threshold-based evaluation. Evaluated on a held-out test set of 1,407 records.",
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
      "Random Forest classifier",
      "Churn probability prediction",
      "Threshold evaluation",
      "Customer risk analysis",
      "Retention insights",
    ],
    result: "78.5% accuracy · 81.2% ROC-AUC",
    resultConfidence: "VERIFIED",
    github: "https://github.com/sachinpullakat/Churn-project",
    demo:
      "https://churn-project-ef77w3gddbxyleixgerchn.streamlit.app/",
    featured: true,
  },
];
