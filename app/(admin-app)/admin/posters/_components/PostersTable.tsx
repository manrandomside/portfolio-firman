import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { PosterActionMenu } from "./PosterActionMenu";

type PosterRow = {
  id: string;
  title: string;
  topic: string;
  year: number;
  tools: string[];
  image_label: string;
  storage_path: string | null;
  display_order: number;
  imageUrl: string | null;
};

type PostersTableProps = {
  posters: PosterRow[];
};

export function PostersTable({ posters }: PostersTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-soft">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-background">
            <tr>
              <TableHeader>Order</TableHeader>
              <TableHeader>Preview</TableHeader>
              <TableHeader>Title</TableHeader>
              <TableHeader>Topic</TableHeader>
              <TableHeader>Year</TableHeader>
              <TableHeader>Tools</TableHeader>
              <TableHeader className="text-right">Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {posters.map((poster) => (
              <tr
                key={poster.id}
                className="border-b border-border last:border-b-0 hover:bg-background/50 transition-colors"
              >
                <TableCell>
                  <span className="font-mono text-xs text-muted">
                    {poster.display_order}
                  </span>
                </TableCell>
                <TableCell>
                  {poster.imageUrl ? (
                    <div className="w-16 h-16 rounded-md overflow-hidden border border-border bg-background relative">
                      <Image
                        src={poster.imageUrl}
                        alt={poster.image_label}
                        fill
                        className="object-cover"
                        unoptimized
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-md border border-dashed border-border bg-background grid place-items-center">
                      <ImageOff
                        size={16}
                        strokeWidth={1.4}
                        className="text-muted"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/posters/${poster.id}/edit`}
                    className="text-foreground hover:underline font-medium"
                  >
                    {poster.title}
                  </Link>
                  <p className="text-xs text-muted mt-1 line-clamp-1 max-w-xs">
                    {poster.image_label}
                  </p>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-foreground">
                    {poster.topic}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-muted">
                    {poster.year}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center flex-wrap gap-1.5 max-w-xs">
                    {poster.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="inline-block font-mono text-[10px] uppercase tracking-wider text-foreground bg-background border border-border rounded-full px-2 py-0.5"
                      >
                        {tool}
                      </span>
                    ))}
                    {poster.tools.length > 3 && (
                      <span className="font-mono text-[10px] text-muted">
                        +{poster.tools.length - 3}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <PosterActionMenu
                    posterId={poster.id}
                    posterTitle={poster.title}
                  />
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border">
        {posters.map((poster) => (
          <div key={poster.id} className="p-5">
            <div className="flex items-start gap-3 mb-3">
              {/* Thumbnail */}
              {poster.imageUrl ? (
                <div className="w-20 h-20 rounded-md overflow-hidden border border-border bg-background relative flex-shrink-0">
                  <Image
                    src={poster.imageUrl}
                    alt={poster.image_label}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-md border border-dashed border-border bg-background grid place-items-center flex-shrink-0">
                  <ImageOff
                    size={20}
                    strokeWidth={1.4}
                    className="text-muted"
                  />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/admin/posters/${poster.id}/edit`}
                    className="text-foreground font-medium hover:underline block"
                  >
                    {poster.title}
                  </Link>
                  <PosterActionMenu
                    posterId={poster.id}
                    posterTitle={poster.title}
                  />
                </div>
                <p className="text-xs text-muted mt-1 line-clamp-1">
                  {poster.topic}
                </p>
                <p className="font-mono text-xs text-muted mt-1">
                  {poster.year} · Order: {poster.display_order}
                </p>
              </div>
            </div>

            {/* Tools */}
            <div className="flex items-center flex-wrap gap-1.5">
              {poster.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-block font-mono text-[10px] uppercase tracking-wider text-foreground bg-background border border-border rounded-full px-2 py-0.5"
                >
                  {tool}
                </span>
              ))}
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
    <td className={`px-5 py-4 text-sm align-middle ${className}`}>
      {children}
    </td>
  );
}
