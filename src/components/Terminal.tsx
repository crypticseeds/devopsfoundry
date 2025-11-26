"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalProps {
  className?: string;
  commands?: { cmd: string; output: string }[];
}

export function Terminal({ className, commands = [] }: TerminalProps) {
  const [lines, setLines] = useState<
    { type: "cmd" | "output"; text: string }[]
  >([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentCmdIndex >= commands.length) return;

    const { cmd, output } = commands[currentCmdIndex];
    // Add command line
    const timeoutId = setTimeout(() => {
      setLines((prev) => [...prev, { type: "cmd", text: `> ${cmd}` }]);

      // Add output after a delay
      setTimeout(() => {
        setLines((prev) => [...prev, { type: "output", text: output }]);
        setCurrentCmdIndex((prev) => prev + 1);
      }, 800);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentCmdIndex, commands]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      className={cn(
        "w-full rounded-lg overflow-hidden border border-border bg-[#1e293b] dark:bg-[#0f172a] shadow-2xl font-mono text-sm",
        className,
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 text-center text-xs text-white/30">
          sre-portfolio ~ bash
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={containerRef}
        className="p-4 h-auto min-h-[150px] overflow-y-auto text-white/80 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "break-words",
              line.type === "cmd" ? "text-emerald-400" : "text-slate-300 pl-4",
            )}
          >
            {line.text}
          </motion.div>
        ))}

        {currentCmdIndex < commands.length && (
          <div className="flex items-center gap-2 text-emerald-400">
            <span>&gt;</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-4 w-2 bg-emerald-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
