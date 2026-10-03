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
      title: t("projects.learningProfileAnalysisSystem.title"),
      description: t("projects.learningProfileAnalysisSystem.description"),
      tech: ["Angular", "AWS SAM", "Lambda", "DynamoDB", "Terraform", "scikit-learn"],
      github: "https://github.com/luidsonl/learning-profile-analysis-system",
      screenshots: [
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/00-cadastro-admin-educador.png"),
          caption: "Cadastro do primeiro educador (vira admin)",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/01-tela-login.png"),
          caption: "Login",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/19-cadastro-nova-conta-selecao-tipo-conta.png"),
          caption: "Cadastro de nova conta",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/02-pagina-inicial-admin.png"),
          caption: "Página inicial do admin",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/03-aprocavao-pendente.png"),
          caption: "Aprovação pendente",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/04-aprovacao-usuarios.png"),
          caption: "Aprovação de usuários",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/05-gerenciamento-usuarios.png"),
          caption: "Gerenciamento de usuários (admin)",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/06-gerenciamento-usuarios-visao-educador.png"),
          caption: "Gerenciamento de usuários (educador)",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/07-cadastro-estudante-visao-educador.png"),
          caption: "Cadastro de estudante (educador)",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/08-listagem-estudantes.png"),
          caption: "Listagem de estudantes",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/09-ficha-estudante.png"),
          caption: "Ficha do estudante",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/10-gerenciamento-acesso-estudante.png"),
          caption: "Gerenciamento de acesso",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/11-consentimento-lgpd.png"),
          caption: "Consentimento LGPD",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/12-selecao-formulario.png"),
          caption: "Seleção de formulário",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/13-selecao-formulario-vark.png"),
          caption: "Seleção do formulário VARK",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/14-preenchimento-formulario.png"),
          caption: "Preenchimento do formulário",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/15-envio-teste-vark.png"),
          caption: "Envio do teste VARK",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/16-resultados-test-vark.png"),
          caption: "Resultado com predição do modelo",
        },
        {
          src: rawImage("learning-profile-analysis-system", "docs/img/17-integracao-back-front-devtools-requisicoes-api.png"),
          caption: "Integração back → front",
        },
      ],
    },
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
      tech: ["Hugo", "Tailwind CSS", "Web Components"],
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
