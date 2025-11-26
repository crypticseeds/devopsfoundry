"use client";

import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { hero } from "@/data/content";
import { Terminal } from "./Terminal";
import { TechOrbit } from "./TechOrbit";
import { motion } from "framer-motion";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const, // "Apple-like" ease
      },
    },
  };

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-20 md:pt-0 bg-transparent transition-colors duration-300">
      {/* Background Grid Effect - kept subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:items-center"
      >
        {/* Text Content */}
        <div className="flex flex-col gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2 md:items-start">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 self-center md:self-auto backdrop-blur-md"
            >
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <MapPin className="h-3 w-3" />
              <span>{hero.location}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold leading-tight tracking-tight md:text-5xl text-foreground"
            >
              Femi Akinlotan
            </motion.h1>
          </div>

          <motion.div
            variants={itemVariants}
            className="w-full max-w-lg mx-auto md:mx-0"
          >
            <Terminal
              commands={[
                { cmd: "whoami", output: "SRE & AI Engineer" },
                { cmd: "uptime", output: "99.99% availability" },
                {
                  cmd: "cat mission.txt",
                  output: "Automating the future, one pipeline at a time.",
                },
              ]}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full max-w-lg flex-row items-center justify-between gap-4 pt-4 mx-auto md:mx-0"
          >
            <Link
              href={hero.buttons.resume.url}
              target="_blank"
              className="group flex items-center justify-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-8 py-3.5 text-sm font-bold text-foreground backdrop-blur-sm transition-all hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
            >
              <Download className="h-4 w-4" />
              {hero.buttons.resume.text}
            </Link>
            <Link
              href={hero.buttons.projects.url}
              className="group flex items-center justify-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-8 py-3.5 text-sm font-bold text-foreground backdrop-blur-sm transition-all hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
            >
              {hero.buttons.projects.text}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Tech Orbit Visual */}
        <motion.div
          variants={itemVariants}
          className="relative mx-auto w-full max-w-[350px] md:ml-auto md:mr-0"
        >
          <TechOrbit />

          {/* About Me Section */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed font-mono">
              {hero.aboutMe}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
