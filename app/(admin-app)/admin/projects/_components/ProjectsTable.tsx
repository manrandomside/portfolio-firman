import Link from "next/link";
import { ProjectActionMenu } from "./ProjectActionMenu";

type ProjectRow = {
  id: string;
  number: string;
  title: string;
  role_timeline: string;
  display_order: number;
  area: {
    id: string;
    slug: string;
    title: string;
  };
  techCount: number;
  imageCount: number;
  linkCount: number;
};

type ProjectsTableProps = {
  projects: ProjectRow[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-soft">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-background">
            <tr>
              <TableHeader>Order</TableHeader>
              <TableHeader>Title</TableHeader>
              <TableHeader>Area</TableHeader>
              <TableHeader>Number</TableHeader>
              <TableHeader>Relations</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-border last:border-b-0 hover:bg-background/50 transition-colors"
              >
                <TableCell>
                  <span className="font-mono text-xs text-muted">
                    {project.display_order}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-foreground hover:underline font-medium"
                  >
                    {project.title}
                  </Link>
                  <p className="text-xs text-muted mt-1 line-clamp-1 max-w-md">
                    {project.role_timeline}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="inline-block font-mono text-xs uppercase tracking-wider text-foreground bg-background border border-border rounded-full px-2.5 py-1">
                    {project.area.title}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-muted">
                    {project.number}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <span title="Tech tags">{project.techCount} tech</span>
                    <span>·</span>
                    <span title="Images">{project.imageCount} img</span>
                    <span>·</span>
                    <span title="Links">{project.linkCount} link</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <ProjectActionMenu
                    projectId={project.id}
                    projectTitle={project.title}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border">
        {projects.map((project) => (
          <div key={project.id} className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="text-foreground font-medium hover:underline block"
                >
                  {project.title}
                </Link>
                <p className="text-xs text-muted mt-1 line-clamp-1">
                  {project.role_timeline}
                </p>
              </div>
              <ProjectActionMenu
                projectId={project.id}
                projectTitle={project.title}
              />
            </div>
            <div className="flex items-center flex-wrap gap-2 mb-3">
              <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-foreground bg-background border border-border rounded-full px-2 py-0.5">
                {project.area.title}
              </span>
              <span className="font-mono text-xs text-muted">
                #{project.number}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted font-mono">
              <span>Order: {project.display_order}</span>
              <span>·</span>
              <span>{project.techCount} tech</span>
              <span>·</span>
              <span>{project.imageCount} img</span>
              <span>·</span>
              <span>{project.linkCount} link</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-5 py-3 text-left font-mono text-xs uppercase tracking-widest text-muted ${className}`}
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-5 py-4 text-sm align-top ${className}`}>{children}</td>
  );
}
