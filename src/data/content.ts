export const hero = {
    location: "London, UK",
    title: {
        first: "DevOps, SRE &",
        second: "Platform Engineer"
    },
    description: "I help engineering teams ship faster and more safely by building reliable cloud-native infrastructure, automated CI/CD pipelines, and scalable AI/ML workflows.",
    buttons: {
        resume: {
            text: "View Resume",
            url: "/Femi-Akinlotan-Resume.pdf"
        },
        projects: {
            text: "View Projects",
            url: "#projects"
        }
    }
}

export const projects = [
    {
        title: "Kubernetes Auto-Scaler",
        description: "An intelligent auto-scaling operator for K8s clusters that optimizes cost and performance using custom metrics.",
        tags: ["Go", "Kubernetes", "Prometheus", "AWS"],
        links: {
            github: "https://github.com",
            demo: "https://example.com",
            writeup: "/blog/scaling-prometheus",
        },
    },
    {
        title: "LLM RAG Pipeline",
        description: "Production-ready RAG pipeline for enterprise documentation, featuring semantic search and hallucination checks.",
        tags: ["Python", "LangChain", "Pinecone", "FastAPI"],
        links: {
            github: "https://github.com",
            demo: "https://example.com",
            writeup: null,
        },
    },
    {
        title: "Multi-Cloud Terraform Modules",
        description: "A suite of reusable, compliant Terraform modules for deploying secure infrastructure across AWS and Azure.",
        tags: ["Terraform", "HCL", "Azure", "AWS"],
        links: {
            github: "https://github.com",
            demo: null,
            writeup: null,
        },
    },
]

export const blogPosts = [
    {
        title: "Scaling Prometheus for High-Cardinality Metrics",
        summary: "Strategies for managing metric explosion in large-scale Kubernetes environments using Thanos and downsampling.",
        date: "Oct 12, 2024",
        tags: ["SRE", "Observability", "Prometheus"],
        slug: "scaling-prometheus",
    },
    {
        title: "Building an Internal Developer Platform with Backstage",
        summary: "How we reduced onboarding time by 40% by centralizing documentation and service templates.",
        date: "Sep 28, 2024",
        tags: ["Platform Engineering", "Backstage", "DX"],
        slug: "internal-developer-platform",
    },
    {
        title: "Optimizing LLM Inference Costs on AWS",
        summary: "A deep dive into instance selection, quantization, and batching strategies to reduce AI infrastructure bills.",
        date: "Sep 15, 2024",
        tags: ["AI Engineering", "AWS", "FinOps"],
        slug: "optimizing-llm-costs",
    },
]

export const socialLinks = {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    x: "https://x.com"
}
