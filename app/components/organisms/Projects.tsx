import ProjectCard from "../molecules/ProjectCard";
import { TranslationFunction } from "@/types/translations";
import type { Project } from "@/types/project";

type Props = {
  t: TranslationFunction;
};

const rawImage = (repo: string, path: string) =>
  `https://raw.githubusercontent.com/luidsonl/${repo}/main/${path}`;

export default function Projects({ t }: Props) {
  const projects: Project[] = [
    {
      title: t("projects.zeroShared.title"),
      description: t("projects.zeroShared.description"),
      tech: ["React", "Vite", "AWS", "Lambda", "DynamoDB", "S3", "Terraform"],
      github: "https://github.com/luidsonl/0shared",
      screenshots: [
        { src: rawImage("0shared", "docs/img/ss-00.png") },
        { src: rawImage("0shared", "docs/img/ss-01.png") },
        { src: rawImage("0shared", "docs/img/ss-02.png") },
        { src: rawImage("0shared", "docs/img/ss-03.png") },
      ],
    },
    {
      title: t("projects.gitRewriter.title"),
      description: t("projects.gitRewriter.description"),
      tech: ["Tauri", "Rust", "React", "TypeScript", "Vite"],
      github: "https://github.com/luidsonl/git-rewriter",
      screenshots: [
        { src: rawImage("git-rewriter", "docs/img/01.png"), caption: "Dashboard" },
        { src: rawImage("git-rewriter", "docs/img/02.png"), caption: "Contributors" },
        { src: rawImage("git-rewriter", "docs/img/03.png"), caption: "Contributors" },
        { src: rawImage("git-rewriter", "docs/img/04.png"), caption: "Contributors" },
        { src: rawImage("git-rewriter", "docs/img/05.png"), caption: "Review & Apply" },
        { src: rawImage("git-rewriter", "docs/img/06.png"), caption: "Review & Apply" },
        { src: rawImage("git-rewriter", "docs/img/07.png"), caption: "Apply Modal" },
        { src: rawImage("git-rewriter", "docs/img/08.png"), caption: "Commit Explorer" },
        { src: rawImage("git-rewriter", "docs/img/09.png"), caption: "Commit Explorer" },
        { src: rawImage("git-rewriter", "docs/img/10.png"), caption: "Commit Explorer" },
        { src: rawImage("git-rewriter", "docs/img/11.png"), caption: "Contributors" },
        { src: rawImage("git-rewriter", "docs/img/12.png"), caption: "Contributors" },
        { src: rawImage("git-rewriter", "docs/img/13.png"), caption: "Review & Apply" },
      ],
    },
    {
      title: t("projects.handwrittenCharacterRecognition.title"),
      description: t("projects.handwrittenCharacterRecognition.description"),
      tech: ["Python", "TensorFlow", "React", "TensorFlow.js", "OpenCV.js"],
      github: "https://github.com/luidsonl/handwritten-character-recognition",
      deploy:
        "https://luidsonl.github.io/handwritten-character-recognition/",
      screenshots: [
        { src: rawImage("handwritten-character-recognition", "docs/print.png") },
      ],
    },
    {
      title: t("projects.urlShortenerLaravel.title"),
      description: t("projects.urlShortenerLaravel.description"),
      tech: ["Laravel", "Redis", "PostgreSQL", "PHPUnit", "Vue.js"],
      github: "https://github.com/luidsonl/url-shortener-laravel-vue",
    },
    {
      title: t("projects.websocketChat.title"),
      description: t("projects.websocketChat.description"),
      tech: ["React", "WebSocket", "Node.js"],
      github: "https://github.com/luidsonl/websocket-chat",
      deploy: "https://websocket-chat-nd6r.onrender.com/",
    },
    {
      title: t("projects.organizagro.title"),
      description: t("projects.organizagro.description"),
      tech: ["Flutter", "Dart"],
      github: "https://github.com/luidsonl/organizagro",
      screenshots: Array.from({ length: 15 }, (_, position) => ({
        src: rawImage("organizagro", `readme/${position + 1}.png`),
      })),
    },
    {
      title: t("projects.wordGuessing.title"),
      description: t("projects.wordGuessing.description"),
      tech: ["Vue.js", "Tailwind.css", "Pinia"],
      github: "https://github.com/luidsonl/wordguessing-vue",
      deploy: "https://luidsonl.github.io/wordguessing-vue/",
    },
    {
      title: t("projects.blog.title"),
      description: t("projects.blog.description"),
      tech: ["Hugo", "Go", "Tailwind CSS"],
      github: "https://github.com/luidsonl/blog",
      deploy: "https://luidsonl.github.io/blog/",
    }
  ];

  return (
    <section className="py-10 md:py-16" id="projects">
      <div className="container mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold mb-6">{t("projects.heading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
