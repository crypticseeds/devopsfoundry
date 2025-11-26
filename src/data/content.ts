export const hero = {
  location: "London, UK",
  title: {
    first: "DevOps, SRE &",
    second: "Platform Engineer",
  },
  description:
    "Building reliable cloud-native infrastructure and scalable AI/ML workflows.",
  aboutMe:
    "I help engineering teams ship faster and more safely by building reliable cloud-native infrastructure, automated CI/CD pipelines, and scalable AI/ML workflows.",
  buttons: {
    resume: {
      text: "View Resume",
      url: "/Femi-Akinlotan-Resume.pdf",
    },
    projects: {
      text: "View Projects",
      url: "#projects",
    },
  },
};

export const skills = {
  title: "Skills & Tooling",
  subtitle:
    "A comprehensive toolkit for building scalable, reliable, and intelligent systems.",
  groups: [
    {
      title: "DevOps & Platform",
      skills: [
        "Kubernetes",
        "Docker",
        "Terraform",
        "AWS",
        "Azure",
        "GCP",
        "GitHub Actions",
        "ArgoCD",
        "Helm",
        "Ansible",
      ],
    },
    {
      title: "Site Reliability Engineering",
      skills: [
        "Prometheus",
        "Grafana",
        "ELK Stack",
        "Datadog",
        "OpenTelemetry",
        "Incident Response",
        "SLOs/SLIs",
        "Chaos Engineering",
      ],
    },
    {
      title: "AI Engineering & MLOps",
      skills: [
        "Python",
        "LangChain",
        "LangSmith",
        "Ollama",
        "MLflow",
        "Vector DBs",
        "RAG Pipelines",
        "Model Deployment",
      ],
    },
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      badge: "/badges/aws-cloud-practitioner.png", // Placeholder
      link: "https://www.credly.com/badges/47c4b4db-c9b2-4a19-827b-af14d65500bf/public_url",
    },
    {
      name: "AWS Certified Solutions Architect – Associate",
      badge: "/badges/aws-solutions-architect.png", // Placeholder
      link: "https://www.credly.com/badges/694c6087-d904-45c8-89fb-e66db785d6c3/public_url",
    },
    {
      name: "HashiCorp Certified: Terraform Associate (003)",
      badge: "/badges/terraform-associate.png", // Placeholder
      link: "https://www.credly.com/badges/eacb65b4-5d8f-4a34-bd7e-d339cb0f6e0a/public_url",
    },
    {
      name: "ISC2: Certified in Cybersecurity (CC)",
      badge: "/badges/isc2-cc.png", // Placeholder
      link: "https://www.credly.com/badges/e8461054-5b74-4832-aef2-0a885321aa22/public_url",
    },
    {
      name: "CKA: Certified Kubernetes Administrator",
      badge: "/badges/cka.png", // Placeholder
      link: "https://www.credly.com/badges/e62e14aa-ba2a-4aac-886c-2b98a20e180c/public_url",
    },
  ],
};

export const projects = [
  {
    title: "Kubernetes Auto-Scaler",
    description:
      "An intelligent auto-scaling operator for K8s clusters that optimizes cost and performance using custom metrics.",
    tags: ["Go", "Kubernetes", "Prometheus", "AWS"],
    image: "/projects/k8s-autoscaler.png",
    date: "Jan 2024",
    links: {
      github: "https://github.com",
      demo: "https://example.com",
      writeup: "/blog/scaling-prometheus",
    },
  },
  {
    title: "LLM RAG Pipeline",
    description:
      "Production-ready RAG pipeline for enterprise documentation, featuring semantic search and hallucination checks.",
    tags: ["Python", "LangChain", "Pinecone", "FastAPI"],
    image: "/projects/llm-rag-pipeline.png",
    date: "Feb 2024",
    links: {
      github: "https://github.com",
      demo: "https://example.com",
      writeup: null,
    },
  },
  {
    title: "Multi-Cloud Terraform Modules",
    description:
      "A suite of reusable, compliant Terraform modules for deploying secure infrastructure across AWS and Azure.",
    tags: ["Terraform", "HCL", "Azure", "AWS"],
    image: "/projects/terraform-multicloud.png",
    date: "Mar 2024",
    links: {
      github: "https://github.com",
      demo: null,
      writeup: null,
    },
  },
];

export const blogPosts = [
  {
    title: "Scaling Prometheus for High-Cardinality Metrics",
    summary:
      "Strategies for managing metric explosion in large-scale Kubernetes environments using Thanos and downsampling.",
    date: "Oct 12, 2024",
    tags: ["SRE", "Observability", "Prometheus"],
    slug: "scaling-prometheus",
  },
  {
    title: "Building an Internal Developer Platform with Backstage",
    summary:
      "How we reduced onboarding time by 40% by centralizing documentation and service templates.",
    date: "Sep 28, 2024",
    tags: ["Platform Engineering", "Backstage", "DX"],
    slug: "internal-developer-platform",
  },
  {
    title: "Optimizing LLM Inference Costs on AWS",
    summary:
      "A deep dive into instance selection, quantization, and batching strategies to reduce AI infrastructure bills.",
    date: "Sep 15, 2024",
    tags: ["AI Engineering", "AWS", "FinOps"],
    slug: "optimizing-llm-costs",
  },
];

export const footer = {
  copyright: "© 2025 DevOps Foundry – Femi Akinlotan.",
  rights: "All rights reserved.",
  social: {
    linkedin: "https://www.linkedin.com/in/femi-akinlotan/",
    github: "https://github.com/crypticseeds",
    x: "https://x.com/crypticseeds",
    medium: "https://medium.com/@placeholder",
  },
};
