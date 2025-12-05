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
      url: "/assets/Femi-Akinlotan-5-ai.pdf",
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
    title: "E-commerce Microservices",
    description:
      "Building a scalable e-commerce platform using microservices architecture with Spring Boot, Netflix Eureka, Spring Cloud Gateway, and KeyCloak.",
    tags: ["Java", "Spring Boot", "Microservices", "Kubernetes", "Kafka"],
    image: "/projects/e-commerce-microservices/banner.jpg",
    date: "Nov 2024",
    links: {
      github: "https://github.com/crypticseeds/ecommerce-microservices.git",
      demo: null,
      writeup: "/projects/e-commerce-microservices",
    },
  },
  {
    title: "Secure API Management Platform",
    description:
      "Building a secure API management platform from the ground up using Go, PostgreSQL, Docker, Kubernetes, and modern observability tools.",
    tags: ["Go", "Kubernetes", "Docker", "PostgreSQL", "Prometheus"],
    image: "/projects/secure-api-management-platform/banner.png",
    date: "Nov 2024",
    links: {
      github:
        "https://github.com/crypticseeds/secure-api-management-platform.git",
      demo: null,
      writeup: "/projects/secure-api-management-platform",
    },
  },
  {
    title: "TFL Journey Expense Calculator",
    description:
      "An AI-powered expense automation tool that transforms manual transport reimbursement calculations into an intelligent, production-ready workflow.",
    tags: ["AI", "React", "TypeScript", "Gemini", "Langfuse", "Fullstack"],
    image: "/projects/tfl-journey-expense-calculator/banner.webp",
    date: "Dec 2024",
    links: {
      github:
        "https://github.com/crypticseeds/tfL-journey-expense-calculator.git",
      demo: null,
      writeup: "/projects/tfl-journey-expense-calculator",
    },
  },
];

export const footer = {
  copyright: "© 2025 DevOps Foundry – Femi Akinlotan.",
  rights: "All rights reserved.",
  social: {
    linkedin: "https://www.linkedin.com/in/femi-akinlotan/",
    github: "https://github.com/crypticseeds",
    x: "https://x.com/crypticseeds",
    medium: "https://medium.com/@femiakinlotan",
  },
};
