"use client";

import { useState } from "react";
import GalleryModal from "./GalleryModal";
import type { ProjectScreenshot } from "@/types/project";

type Props = {
  title: string;
  screenshots: ProjectScreenshot[];
  labels: {
    trigger: string;
    close: string;
    previous: string;
    next: string;
    loading: string;
    error: string;
  };
};

export default function ProjectGallery({ title, screenshots, labels }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (screenshots.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-3 inline-block cursor-pointer border-0 bg-transparent p-0 text-left text-sm text-sky-600 hover:underline"
      >
        {labels.trigger}
      </button>

      {isOpen && (
        <GalleryModal
          title={title}
          screenshots={screenshots}
          labels={{
            close: labels.close,
            previous: labels.previous,
            next: labels.next,
            loading: labels.loading,
            error: labels.error,
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}