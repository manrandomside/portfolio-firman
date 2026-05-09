export type ProjectImageAspect = "video" | "square" | "portrait";

export type ProjectImagePlaceholder = {
  label: string;
  aspect?: ProjectImageAspect;
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  number: string;
  title: string;
  roleAndTimeline: string;
  description: string;
  tech: string[];
  images: ProjectImagePlaceholder[];
  links: ProjectLink[];
};
