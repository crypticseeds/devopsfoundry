"use client"

import Link from "next/link"
import { ExternalLink, Github, BookOpen } from "lucide-react"
import { projects } from "@/data/content"
import { motion } from "framer-motion"

export function Projects() {
    return (
        <section id="projects" className="py-24 relative">
            <div className="mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 flex flex-col items-center text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
                    <p className="max-w-2xl text-secondary">
                        Selected work showcasing infrastructure automation, reliability engineering, and AI integration.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="group flex flex-col justify-between rounded-2xl border border-secondary/20 bg-background/50 backdrop-blur-sm p-6 shadow-sm transition-all hover:border-foreground/20 hover:shadow-xl hover:shadow-blue-500/5"
                        >
                            <div>
                                <h3 className="mb-3 text-xl font-bold">{project.title}</h3>
                                <p className="mb-6 text-sm leading-relaxed text-secondary">
                                    {project.description}
                                </p>
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-md bg-secondary/10 px-2 py-1 text-[10px] font-medium text-secondary transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4 border-t border-secondary/10 pt-4">
                                <Link
                                    href={project.links.github}
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-foreground"
                                >
                                    <Github className="h-4 w-4" />
                                    Code
                                </Link>
                                {project.links.demo && (
                                    <Link
                                        href={project.links.demo}
                                        target="_blank"
                                        className="flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent-blue"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Live Demo
                                    </Link>
                                )}
                                {project.links.writeup && (
                                    <Link
                                        href={project.links.writeup}
                                        className="flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent-blue"
                                        aria-label="Read Case Study"
                                        title="Read Case Study"
                                    >
                                        <BookOpen className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
