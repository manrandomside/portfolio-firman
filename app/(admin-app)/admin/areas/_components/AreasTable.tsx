import Link from "next/link";
import { AreaActionMenu } from "./AreaActionMenu";

type Area = {
  id: string;
  slug: string;
  number_label: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
};

type AreasTableProps = {
  areas: Area[];
};

export function AreasTable({ areas }: AreasTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-soft">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-background">
            <tr>
              <TableHeader>Order</TableHeader>
              <TableHeader>Title</TableHeader>
              <TableHeader>Slug</TableHeader>
              <TableHeader>Number Label</TableHeader>
              <TableHeader>Icon</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr
                key={area.id}
                className="border-b border-border last:border-b-0 hover:bg-background/50 transition-colors"
              >
                <TableCell>
                  <span className="font-mono text-xs text-muted">
                    {area.display_order}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/areas/${area.id}/edit`}
                    className="text-foreground hover:underline font-medium"
                  >
                    {area.title}
                  </Link>
                  <p className="text-xs text-muted mt-1 line-clamp-1 max-w-md">
                    {area.description}
                  </p>
                </TableCell>
                <TableCell>
                  <code className="font-mono text-xs text-muted bg-background px-2 py-1 rounded">
                    {area.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-muted">
                    {area.number_label}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-muted">
                    {area.icon_name}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <AreaActionMenu
                    areaId={area.id}
                    areaTitle={area.title}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border">
        {areas.map((area) => (
          <div key={area.id} className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/areas/${area.id}/edit`}
                  className="text-foreground font-medium hover:underline block"
                >
                  {area.title}
                </Link>
                <code className="font-mono text-xs text-muted">
                  {area.slug}
                </code>
              </div>
              <AreaActionMenu areaId={area.id} areaTitle={area.title} />
            </div>
            <p className="text-xs text-muted line-clamp-2 mb-2">
              {area.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted font-mono">
              <span>Order: {area.display_order}</span>
              <span>·</span>
              <span>{area.icon_name}</span>
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
