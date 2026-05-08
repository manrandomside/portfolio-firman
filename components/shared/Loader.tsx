"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

export function Loader() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const count = useMotionValue(0);

  const display = useTransform(count, (latest) => {
    const rounded = Math.round(latest);
    if (rounded >= 100) return "100";
    return rounded.toString().padStart(2, "0");
  });
  const widthPercent = useTransform(count, (latest) => `${latest}%`);

  useEffect(() => {
    const counterDuration = reducedMotion ? 0 : 2.5;
    const holdMs = reducedMotion ? 0 : 300;
    let timer: number | undefined;

    const controls = animate(count, 100, {
      duration: counterDuration,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => {
        timer = window.setTimeout(() => setIsVisible(false), holdMs);
      },
    });

    return () => {
      controls.stop();
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [count, reducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          aria-live="polite"
          className="bg-background fixed inset-0 z-[100] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.6,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col items-center">
            <motion.span className="text-foreground font-mono text-[clamp(96px,18vw,200px)] leading-none font-light tabular-nums">
              {display}
            </motion.span>

            <div className="mt-16 w-60">
              <div className="bg-border relative h-px w-full overflow-hidden">
                <motion.div
                  className="bg-foreground absolute inset-y-0 left-0"
                  style={{ width: widthPercent }}
                />
              </div>
              <p className="text-muted mt-6 text-center font-mono text-[11px] tracking-widest uppercase">
                Loading portfolio
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
