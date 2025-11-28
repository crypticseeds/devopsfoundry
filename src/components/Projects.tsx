"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { projects } from "@/data/content";
import { motion } from "framer-motion";

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Featured Projects
          </h2>
          <p className="max-w-2xl text-secondary">
            Selected work showcasing infrastructure automation, reliability
            engineering, and AI integration.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Meta Data */}
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span>Femi Akinlotan</span>
                  <span>•</span>
                  <span>{project.date}</span>
                </div>

                <h3 className="mb-2 text-xl font-bold tracking-tight text-card-foreground transition-colors group-hover:text-accent-blue">
                  {project.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[10px] font-medium text-secondary transition-colors hover:border-secondary/40 hover:text-foreground hover:bg-secondary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <Link
                      href={project.links.github}
                      target="_blank"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent-blue"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </Link>
                    {project.links.demo && (
                      <Link
                        href={project.links.demo}
                        target="_blank"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent-blue"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Link>
                    )}
                    {project.links.writeup && (
                      <Link
                        href={project.links.writeup}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent-blue"
                      >
                        <BookOpen className="h-4 w-4" />
                        Read
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
