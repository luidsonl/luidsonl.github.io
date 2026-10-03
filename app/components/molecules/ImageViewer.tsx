"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import IconButton from "../atoms/IconButton";
import ZoomableImage, {
  MIN_SCALE,
  type ZoomableImageHandle,
} from "../atoms/ZoomableImage";
import ZoomControls from "./ZoomControls";
import { useTranslations } from "@/i18n/useTranslations";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageViewer({ src, alt, onClose }: Props) {
  const [scale, setScale] = useState(MIN_SCALE);
  const imageRef = useRef<ZoomableImageHandle>(null);
  const t = useTranslations();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-60 bg-slate-950"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div className="pointer-events-none relative h-full w-full">
        <ZoomableImage
          ref={imageRef}
          src={src}
          alt={alt}
          onScaleChange={setScale}
          onClickOutside={onClose}
        />

        <div className="absolute right-4 top-4">
          <IconButton label={t("gallery.close")} onClick={onClose} autoFocus>
            <X className="h-6 w-6" />
          </IconButton>
        </div>

        <div className="absolute inset-x-0 bottom-4">
          <ZoomControls imageRef={imageRef} scale={scale} />
        </div>
      </div>
    </div>
  );
}