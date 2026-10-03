"use client";

import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import IconButton from "../atoms/IconButton";
import type { ZoomableImageHandle } from "../atoms/ZoomableImage";
import { MAX_SCALE, MIN_SCALE } from "../atoms/ZoomableImage";
import { useTranslations } from "@/i18n/useTranslations";

type Props = {
  imageRef: React.RefObject<ZoomableImageHandle | null>;
  scale: number;
};

export default function ZoomControls({ imageRef, scale }: Props) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-center gap-2">
      <IconButton
        label={t("gallery.zoomOut")}
        onClick={() => imageRef.current?.zoomOut()}
        disabled={scale <= MIN_SCALE}
      >
        <ZoomOut className="h-6 w-6" />
      </IconButton>

      <IconButton label={t("gallery.resetZoom")} onClick={() => imageRef.current?.reset()}>
        <RotateCcw className="h-6 w-6" />
      </IconButton>

      <IconButton
        label={t("gallery.zoomIn")}
        onClick={() => imageRef.current?.zoomIn()}
        disabled={scale >= MAX_SCALE}
      >
        <ZoomIn className="h-6 w-6" />
      </IconButton>
    </div>
  );
}