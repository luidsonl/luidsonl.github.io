"use client";

import { useState } from "react";
import GalleryModal from "./GalleryModal";
import { useTranslations } from "@/i18n/useTranslations";
import type { ProjectScreenshot } from "@/types/project";

type Props = {
  title: string;
  screenshots: ProjectScreenshot[];
};

export default function ProjectGallery({ title, screenshots }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  if (screenshots.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-3 inline-block cursor-pointer border-0 bg-transparent p-0 text-left text-sm text-sky-600 hover:underline"
      >
        {t("gallery.viewScreenshots")}
      </button>

      {isOpen && (
        <GalleryModal
          title={title}
          screenshots={screenshots}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}