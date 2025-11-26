"use client";

import Image from "next/image";
import { Cpu, Server, Terminal } from "lucide-react";
import { skills } from "@/data/content";
import { motion } from "framer-motion";

export function Skills() {
  const icons = [
    <Server key="server" className="h-6 w-6 text-accent-blue" />,
    <Terminal key="terminal" className="h-6 w-6 text-accent-red" />,
    <Cpu key="cpu" className="h-6 w-6 text-foreground" />,
  ];

  return (
    <section
      id="skills"
      className="bg-secondary/5 py-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {skills.title}
          </h2>
          <p className="max-w-2xl text-secondary">{skills.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {skills.groups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-background/50 backdrop-blur-sm p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-blue-500/5 dark:border-white/5"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-2.5 transition-colors group-hover:bg-secondary/20">
                  {icons[index]}
                </div>
                <h3 className="font-bold leading-tight">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                    className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1 text-xs font-medium text-secondary transition-colors hover:border-secondary/40 hover:text-foreground hover:bg-secondary/10 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="mb-12 text-center text-2xl font-bold md:text-3xl">
            Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {skills.certifications.map((cert, index) => (
              <motion.a
                key={cert.name}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/5 p-4 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-md">
                  <Image
                    src={cert.badge}
                    alt={cert.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain transition-transform duration-300"
                  />
                </div>
                <span className="max-w-[140px] text-xs font-medium text-secondary transition-colors group-hover:text-foreground">
                  {cert.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
