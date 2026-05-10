import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  description,
}: StatsCardProps) {
  return (
    <article className="bg-soft border border-border rounded-lg p-6 transition-colors hover:border-foreground/40">
      <div className="flex items-start justify-between mb-4">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {label}
        </p>
        <Icon size={18} strokeWidth={1.4} className="text-muted" />
      </div>

      <p className="text-3xl font-medium text-foreground tracking-tight mb-1">
        {value}
      </p>

      {description && <p className="text-xs text-muted">{description}</p>}
    </article>
  );
}
