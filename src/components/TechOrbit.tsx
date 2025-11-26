"use client";

import { motion } from "framer-motion";
import {
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiPython,
  SiGo,
  SiPrometheus,
  SiGrafana,
  SiLinux,
  SiTypescript,
  SiLangchain,
  SiOpenai,
} from "react-icons/si";

const icons = [
  { Icon: SiDocker, color: "#2496ED" },
  { Icon: SiKubernetes, color: "#326CE5" },
  { Icon: SiTerraform, color: "#7B42BC" },
  { Icon: SiPython, color: "#3776AB" },
  { Icon: SiGo, color: "#00ADD8" },
  { Icon: SiPrometheus, color: "#E6522C" },
  { Icon: SiGrafana, color: "#F46800" },
  { Icon: SiLinux, color: "#FCC624" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiLangchain, color: "#1C3C3C" }, // Dark green/black usually, adjusting for visibility
  { Icon: SiOpenai, color: "#412991" }, // Using OpenAI as proxy for "AI Tools"
];

export function TechOrbit() {
  const DURATION = 40; // Slower rotation for more icons

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      {/* Central Core with Portrait Placeholder */}
      <div className="absolute z-10 h-40 w-40 rounded-full bg-gradient-to-b from-foreground/5 to-foreground/10 p-1 shadow-lg shadow-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5">
        <div className="relative h-full w-full overflow-hidden rounded-full bg-muted/50">
          <img
            src="/portrait.jpg"
            alt="Portrait"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Orbiting Icons */}
      {icons.map(({ Icon, color }, index) => {
        const angleStep = 360 / icons.length;
        const initialAngle = index * angleStep;

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ rotate: initialAngle }}
            animate={{
              rotate: [initialAngle, initialAngle + 360],
            }}
            transition={{
              duration: DURATION,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: "300px", // Orbit diameter
              height: "300px",
            }}
          >
            <motion.div
              className="absolute -top-6 left-1/2 -ml-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background/80 backdrop-blur-md shadow-lg"
              style={{ color }}
              initial={{ rotate: -initialAngle }}
              animate={{
                rotate: [-initialAngle, -initialAngle - 360],
              }} // Counter-rotate to keep icon upright
              transition={{
                duration: DURATION,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Orbit Rings */}
      <div className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-foreground/10" />
      <div className="absolute h-[200px] w-[200px] rounded-full border border-foreground/10" />
    </div>
  );
}
