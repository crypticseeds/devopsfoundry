import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { socialLinks } from "@/data/content"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-background py-12">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <span className="text-sm font-medium text-foreground">
                        © 2025 DevOps Foundry – Femi Akinlotan. <span className="text-secondary font-normal">All rights reserved.</span>
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary transition-colors hover:text-accent-blue"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary transition-colors hover:text-foreground"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5" />
                    </Link>
                    <Link
                        href={socialLinks.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary transition-colors hover:text-foreground"
                        aria-label="X (formerly Twitter)"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
