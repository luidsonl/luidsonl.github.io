"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LoaderCircle, X } from "lucide-react";
import { useTranslations } from "@/i18n/useTranslations";
import type { ProjectScreenshot } from "@/types/project";

type GalleryLabels = {
  close: string;
  previous: string;
  next: string;
  loading: string;
  error: string;
};

type SlideProps = {
  screenshot: ProjectScreenshot;
  title: string;
  position: number;
  loadingLabel: string;
  errorLabel: string;
  slideRef: (element: HTMLElement | null) => void;
};

function GallerySlide({
  screenshot,
  title,
  position,
  loadingLabel,
  errorLabel,
  slideRef,
}: SlideProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <figure
      ref={slideRef}
      className="flex w-[86vw] max-w-4xl shrink-0 snap-center flex-col items-center gap-3"
    >
      <div className="relative w-full flex-1">
        {status === "loading" && (
          <span
            role="status"
            aria-label={loadingLabel}
            className="absolute inset-0 flex items-center justify-center"
          >
            <LoaderCircle className="h-8 w-8 animate-spin text-slate-400" />
          </span>
        )}

        {status === "error" ? (
          <span className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            {errorLabel}
          </span>
        ) : (
          <Image
            src={screenshot.src}
            alt={screenshot.caption ?? `${title} (${position + 1})`}
            fill
            sizes="(max-width: 768px) 86vw, 56rem"
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
            className={`object-contain transition-opacity duration-200 ${
              status === "loaded" ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {screenshot.caption && (
        <figcaption className="shrink-0 text-center text-sm text-slate-300">
          {screenshot.caption}
        </figcaption>
      )}
    </figure>
  );
}

type Props = {
  title: string;
  screenshots: ProjectScreenshot[];
  onClose: () => void;
};

export default function GalleryModal({
  title,
  screenshots,
  onClose,
}: Props) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);

  const t = useTranslations();
  const labels: GalleryLabels = {
    close: t("gallery.close"),
    previous: t("gallery.previous"),
    next: t("gallery.next"),
    loading: t("gallery.loading"),
    error: t("gallery.error"),
  };

  const total = screenshots.length;

  const goTo = useCallback(
    (target: number) => {
      if (total === 0) return;
      const clamped = (target + total) % total;
      slidesRef.current[clamped]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setIndex(clamped);
    },
    [total]
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, index, onClose]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    let closest = 0;
    let smallestDistance = Infinity;

    slidesRef.current.forEach((slide, position) => {
      if (!slide) return;
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closest = position;
      }
    });

    setIndex((current) => (current === closest ? current : closest));
  };

  if (total === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label={labels.close}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/90 backdrop-blur-sm"
      />

      <div className="relative flex h-full flex-col">
        <header className="flex shrink-0 items-center gap-4 px-4 py-3 text-white">
          <h2 className="min-w-0 flex-1 truncate text-sm font-medium">{title}</h2>
          <span className="shrink-0 text-xs tabular-nums text-slate-300">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            aria-label={labels.close}
            onClick={onClose}
            autoFocus
            className="shrink-0 rounded-md p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex min-h-0 flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 md:px-20"
        >
          {screenshots.map((screenshot, position) => (
            <GallerySlide
              key={screenshot.src}
              screenshot={screenshot}
              title={title}
              position={position}
              loadingLabel={labels.loading}
              errorLabel={labels.error}
              slideRef={(element) => {
                slidesRef.current[position] = element;
              }}
            />
          ))}
        </div>

        {total > 1 && (
          <footer className="flex shrink-0 items-center gap-3 px-4 py-4">
            <button
              type="button"
              aria-label={labels.previous}
              onClick={() => goTo(index - 1)}
              className="shrink-0 rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <ul className="scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto">
              {screenshots.map((screenshot, position) => (
                <li key={screenshot.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(position)}
                    aria-current={position === index}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      position === index
                        ? "w-6 bg-white"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              aria-label={labels.next}
              onClick={() => goTo(index + 1)}
              className="shrink-0 rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}