import { BadgeCheck, Cpu, Server, Terminal } from "lucide-react"

export function Skills() {
    const skillGroups = [
        {
            title: "DevOps & Platform",
            icon: <Server className="h-6 w-6 text-accent-blue" />,
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
            icon: <Terminal className="h-6 w-6 text-accent-red" />,
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
            icon: <Cpu className="h-6 w-6 text-foreground" />,
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
    ]

    return (
        <section id="skills" className="bg-secondary/5 py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mb-16 flex flex-col items-center text-center">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Skills & Tooling</h2>
                    <p className="max-w-2xl text-secondary">
                        A comprehensive toolkit for building scalable, reliable, and intelligent systems.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {skillGroups.map((group) => (
                        <div
                            key={group.title}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-white/5"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-secondary/10 p-2.5 transition-colors group-hover:bg-secondary/20">
                                    {group.icon}
                                </div>
                                <h3 className="font-bold leading-tight">{group.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:border-secondary/40 hover:text-foreground"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <div className="mt-16">
                    <h3 className="mb-8 text-center text-xl font-semibold text-secondary">
                        Certifications
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 rounded-full border border-secondary/20 bg-background px-4 py-2 text-sm font-medium text-secondary"
                            >
                                <BadgeCheck className="h-4 w-4 text-accent-blue" />
                                <span>AWS Certification Placeholder</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
