export type ProjectScreenshot = {
  src: string;
  caption?: string;
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  deploy?: string;
  screenshots?: ProjectScreenshot[];
};