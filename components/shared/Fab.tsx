"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";

type IconProps = {
  size?: number;
  className?: string;
};

type IconComponent = ComponentType<IconProps>;

function InstagramIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const MailIcon: IconComponent = ({ size = 18, className }) => (
  <Mail
    size={size}
    className={className}
    strokeWidth={1.6}
    aria-hidden="true"
  />
);

type SocialLink = {
  label: string;
  icon: IconComponent;
  href: string;
  aria: string;
  external: boolean;
};

const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/manfdlh/",
    aria: "Open Instagram profile",
    external: true,
  },
  {
    label: "LinkedIn",
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/firmanfadilah",
    aria: "Open LinkedIn profile",
    external: true,
  },
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/manrandomside",
    aria: "Open GitHub profile",
    external: true,
  },
  {
    label: "Email",
    icon: MailIcon,
    href: "mailto:firmanfdlh1@gmail.com",
    aria: "Send email",
    external: false,
  },
];

export function Fab() {
  const reducedMotion = useReducedMotion();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const settleTimer = window.setTimeout(() => setHasMounted(true), 1000);
    return () => window.clearTimeout(settleTimer);
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const yOffset = reducedMotion ? 0 : 20;
  const initialDelay = hasMounted ? 0 : 0.3;

  return (
    <motion.nav
      role="navigation"
      aria-label="Social links"
      aria-hidden={isFooterVisible}
      initial={{ opacity: 0, y: yOffset }}
      animate={{
        opacity: isFooterVisible ? 0 : 1,
        y: isFooterVisible ? yOffset : 0,
      }}
      transition={{
        duration: isFooterVisible ? 0.4 : 0.6,
        delay: isFooterVisible ? 0 : initialDelay,
        ease: isFooterVisible ? "easeIn" : "easeOut",
      }}
      style={{ pointerEvents: isFooterVisible ? "none" : "auto" }}
      className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 fixed bottom-[max(env(safe-area-inset-bottom),1rem)] left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-md"
    >
      {socialLinks.map((link) => (
        <FabButton key={link.label} {...link} />
      ))}
    </motion.nav>
  );
}

function FabButton({ label, icon: Icon, href, aria, external }: SocialLink) {
  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      aria-label={aria}
      {...externalProps}
      className="group relative flex h-10 w-10 items-center justify-center"
    >
      <span
        aria-hidden="true"
        className="bg-border pointer-events-none absolute inset-0 scale-[0.6] rounded-full opacity-0 transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 motion-reduce:scale-100 motion-reduce:transition-opacity"
      />

      <Icon
        size={18}
        className="text-muted group-hover:text-foreground relative scale-100 transition-all duration-200 ease-out group-hover:scale-110 motion-reduce:transition-colors motion-reduce:group-hover:scale-100"
      />

      <span
        role="tooltip"
        className="bg-foreground text-background pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 rounded-md px-3 py-1.5 font-mono text-xs whitespace-nowrap opacity-0 transition-all delay-100 duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
      >
        {label}
      </span>
    </a>
  );
}
