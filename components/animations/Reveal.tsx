"use client";

import type { ElementType, ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  threshold?: number;
  duration?: number;
};

export function Reveal({
  children,
  as: Component = "div",
  className,
  delay = 0,
  threshold = 0.15,
  duration = 600,
}: RevealProps) {
  const { ref, isRevealed } = useScrollReveal<HTMLElement>({ threshold });

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        isRevealed
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0",
        className
      )}
      style={{
        transitionDelay: isRevealed ? `${delay}ms` : "0ms",
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </Component>
  );
}
