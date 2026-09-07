import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { business } from "../data/business";
import { Brand } from "./Brand";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Estimate", "/estimate"],
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 190, damping: 30, mass: 0.25 });
  return (
    <header className="site-header">
      <motion.div className="scroll-progress" style={{ scaleX: reduced ? 0 : progress }} />
      <div className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <NavLink key={href} to={href} end={href === "/"}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <a className="nav-phone" href={`tel:${business.phoneHref}`}><Phone size={16} /> <span>{business.phoneDisplay}</span></a>
          <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={reduced ? false : { opacity: 0, transform: "translateY(-12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduced ? undefined : { opacity: 0, transform: "translateY(-12px)" }}
            transition={{ type: "spring", bounce: 0.12, visualDuration: 0.35 }}
          >
            {links.map(([label, href]) => <NavLink key={href} to={href} end={href === "/"} onClick={() => setOpen(false)}>{label}</NavLink>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
