import Badge from "../atoms/Badge";
import ProjectGallery from "./ProjectGallery";
import type { Project } from "@/types/project";
import { TranslationFunction } from "@/types/translations";

type Props = {
  project: Project;
  t: TranslationFunction;
};

export default function ProjectCard({ project, t }: Props) {
  return (
    <article className="border border-slate-200 dark:border-slate-700 rounded-md p-4 hover:shadow-sm transition bg-white dark:bg-slate-900/40">
      <h3 className="text-lg font-medium mb-2">{project.title}</h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
        {project.description}
      </p>
      <div className="flex flex-wrap">
        {project.tech.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-3">
        {project.github && (
          <a
            href={project.github}
            className="text-sm text-sky-600 hover:underline mt-3 inline-block"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
        )}
        {project.deploy && (
          <a
            href={project.deploy}
            className="text-sm text-sky-600 hover:underline mt-3 inline-block"
            target="_blank"
            rel="noreferrer"
          >
            deploy
          </a>
        )}
        <ProjectGallery
          title={project.title}
          screenshots={project.screenshots ?? []}
          labels={{
            trigger: t("gallery.viewScreenshots"),
            close: t("gallery.close"),
            previous: t("gallery.previous"),
            next: t("gallery.next"),
            loading: t("gallery.loading"),
            error: t("gallery.error"),
          }}
        />
      </div>
    </article>
  );
}
