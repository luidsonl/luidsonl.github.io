"use client";

import { useCallback, useImperativeHandle, useRef, useState } from "react";

export const MIN_SCALE = 1;
export const MAX_SCALE = 4;

const ZOOM_STEP = 1.5;
const DOUBLE_TAP_DELAY = 300;
const DRAG_THRESHOLD = 4;
const TAP_DISTANCE = 8;

type Point = {
  x: number;
  y: number;
};

type Gesture = {
  originOffset: Point;
  startCenter: Point;
  startDistance: number;
};

export type ZoomableImageHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
};

type Props = {
  src: string;
  alt: string;
  ref?: React.Ref<ZoomableImageHandle>;
  onScaleChange?: (scale: number) => void;
  onClickOutside?: () => void;
};

const distanceBetween = (first: Point, second: Point) =>
  Math.hypot(first.x - second.x, first.y - second.y);

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ZoomableImage({
  src,
  alt,
  ref,
  onScaleChange,
  onClickOutside,
}: Props) {
  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const gestureRef = useRef<Gesture | null>(null);
  const startPointRef = useRef<Point>({ x: 0, y: 0 });
  const lastTapRef = useRef(0);
  const movedRef = useRef(false);

  const clampOffset = useCallback((next: Point, nextScale: number): Point => {
    const container = containerRef.current;
    if (!container) return next;

    const maxX = ((nextScale - MIN_SCALE) * container.offsetWidth) / 2;
    const maxY = ((nextScale - MIN_SCALE) * container.offsetHeight) / 2;

    return { x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) };
  }, []);

  const applyScale = useCallback(
    (nextScale: number, nextOffset: Point) => {
      setScale(nextScale);
      setOffset(nextOffset);
      onScaleChange?.(nextScale);
    },
    [onScaleChange]
  );

  const zoomTo = useCallback(
    (nextScale: number) => {
      const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);

      applyScale(
        clamped,
        clamped === MIN_SCALE
          ? { x: 0, y: 0 }
          : clampOffset(offset, clamped)
      );
    },
    [applyScale, clampOffset, offset]
  );

  const zoomBy = useCallback(
    (factor: number) => zoomTo(scale * factor),
    [scale, zoomTo]
  );

  const reset = useCallback(
    () => applyScale(MIN_SCALE, { x: 0, y: 0 }),
    [applyScale]
  );

  useImperativeHandle(
    ref,
    () => ({
      zoomIn: () => zoomBy(ZOOM_STEP),
      zoomOut: () => zoomBy(1 / ZOOM_STEP),
      reset,
    }),
    [reset, zoomBy]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    const point = { x: event.clientX, y: event.clientY };

    movedRef.current = false;
    startPointRef.current = point;
    pointersRef.current.set(event.pointerId, point);

    const points = Array.from(pointersRef.current.values());
    const [first, second] = points;

    gestureRef.current = {
      originOffset: offset,
      startCenter:
        points.length >= 2
          ? { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
          : first,
      startDistance: points.length >= 2 ? distanceBetween(first, second) : 0,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || !pointersRef.current.has(event.pointerId)) return;

    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);

    if (Math.abs(point.x - startPointRef.current.x) > DRAG_THRESHOLD) {
      movedRef.current = true;
    }

    const points = Array.from(pointersRef.current.values());
    const [first, second] = points;

    if (points.length >= 2) {
      const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
      const ratio =
        gesture.startDistance > 0
          ? distanceBetween(first, second) / gesture.startDistance
          : 1;
      const nextScale = clamp(scale * ratio, MIN_SCALE, MAX_SCALE);

      applyScale(
        nextScale,
        clampOffset(
          {
            x: gesture.originOffset.x + (center.x - gesture.startCenter.x),
            y: gesture.originOffset.y + (center.y - gesture.startCenter.y),
          },
          nextScale
        )
      );

      return;
    }

    if (scale <= MIN_SCALE) return;

    setOffset(
      clampOffset(
        {
          x: gesture.originOffset.x + (first.x - gesture.startCenter.x),
          y: gesture.originOffset.y + (first.y - gesture.startCenter.y),
        },
        scale
      )
    );
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const isTap =
      !movedRef.current &&
      Math.abs(event.clientX - startPointRef.current.x) < TAP_DISTANCE &&
      Math.abs(event.clientY - startPointRef.current.y) < TAP_DISTANCE;

    pointersRef.current.delete(event.pointerId);

    if (pointersRef.current.size === 0) {
      gestureRef.current = null;
    }

    if (!isTap) {
      lastTapRef.current = 0;
      return;
    }

    const now = Date.now();

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      lastTapRef.current = 0;
      zoomTo(scale > MIN_SCALE ? MIN_SCALE : 2);
      return;
    }

    lastTapRef.current = now;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    if (event.target === event.currentTarget) {
      onClickOutside?.();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      className="pointer-events-auto flex h-full w-full touch-none select-none items-center justify-center overflow-hidden"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-auto max-w-full object-contain"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          cursor: scale > MIN_SCALE ? "grab" : "zoom-in",
        }}
      />
    </div>
  );
}