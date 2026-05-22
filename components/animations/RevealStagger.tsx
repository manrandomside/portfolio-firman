"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type RevealStaggerProps = {
  children: ReactNode[];
  staggerDelay?: number;
  maxStaggered?: number;
  className?: string;
  itemClassName?: string;
};

export function RevealStagger({
  children,
  staggerDelay = 80,
  maxStaggered = 6,
  className,
  itemClassName,
}: RevealStaggerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => {
        const effectiveIndex = Math.min(index, maxStaggered - 1);
        const delay = effectiveIndex * staggerDelay;

        return (
          <Reveal key={index} delay={delay} className={itemClassName}>
            {child}
          </Reveal>
        );
      })}
    </div>
  );
}
