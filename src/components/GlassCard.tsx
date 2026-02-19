import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", hover = false, onClick }: GlassCardProps) {
  const Component = hover ? motion.div : "div";
  const motionProps = hover
    ? {
        whileHover: { y: -3, scale: 1.008 },
        whileTap: { scale: 0.995 },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <Component
      className={`glass-panel p-5 ${hover ? "cursor-pointer glass-panel-hover" : ""} ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
