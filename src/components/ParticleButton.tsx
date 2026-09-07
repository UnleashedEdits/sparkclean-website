import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

type ParticleButtonProps = PropsWithChildren<{ to: string; variant?: "primary" | "glass" | "light"; className?: string }>;

export function ParticleButton({ to, children, variant = "primary", className = "" }: ParticleButtonProps) {
  const [burst, setBurst] = useState(0);
  const reduced = useReducedMotion();
  const click = () => setBurst((value) => value + 1);

  return (
    <motion.div whileHover={reduced ? undefined : { transform: "translateY(-2px)" }} whileTap={reduced ? undefined : { transform: "scale(0.975)" }}>
      <Link to={to} onClick={click} className={`particle-button particle-button--${variant} ${className}`}>
        <span>{children}</span><ArrowUpRight size={17} />
        {!reduced && burst > 0 && Array.from({ length: 8 }).map((_, index) => (
          <motion.i
            aria-hidden="true"
            className="particle"
            key={`${burst}-${index}`}
            initial={{ opacity: 1, transform: "translate(-50%, -50%) scale(1)" }}
            animate={{
              opacity: 0,
              transform: `translate(calc(-50% + ${Math.cos(index * Math.PI / 4) * 44}px), calc(-50% + ${Math.sin(index * Math.PI / 4) * 44}px)) scale(0)`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </Link>
    </motion.div>
  );
}
