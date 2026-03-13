import { h } from "preact";
import type { ReactNode } from "preact/compat";
import { createContext, useContext, useMemo, useState } from "preact/compat";
import { useRef } from "preact/hooks";
import { useSide } from "./side";
import {
  DEFAULT_SCALE_CONFIG,
  clampScale,
  computeScaleUpdate,
} from "./side-scale";
import type { ScaleUpdate } from "./side-scale";

export interface ViewportContextValue {
  scale: number;
  setScale: (value: number) => void;
  handleViewportWheel: (event: WheelEvent, container: HTMLDivElement) => void;
  handleViewportContainerMouseDown: (
    event: MouseEvent,
    card: HTMLDivElement,
  ) => void;
  applyScaleUpdate: (update: ScaleUpdate, container: HTMLDivElement) => void;
}

const ViewportContext = createContext<ViewportContextValue | undefined>(
  undefined,
);

export function ViewportProvider({ children }: { children: ReactNode }) {
  const { setActiveSlot } = useSide();
  const [scale, setScale] = useState(0.8);
  const rafRef = useRef<number | null>(null);
  const pendingUpdateRef = useRef<ScaleUpdate | null>(null);

  const normalizeWheelDelta = (
    event: WheelEvent,
    container: HTMLDivElement,
  ) => {
    let delta = event.deltaY;
    if (event.deltaMode === 1) {
      delta *= 16;
    } else if (event.deltaMode === 2) {
      delta *= container.clientHeight;
    }
    const maxDelta = 120;
    return Math.min(maxDelta, Math.max(-maxDelta, delta));
  };

  const applyScaleUpdate = useMemo(
    () => (update: ScaleUpdate, container: HTMLDivElement) => {
      if (update.nextScale === scale) {
        return;
      }
      setScale(update.nextScale);
      pendingUpdateRef.current = update;
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const pending = pendingUpdateRef.current;
        if (!pending) {
          return;
        }
        container.scrollLeft = pending.nextScrollLeft;
        container.scrollTop = pending.nextScrollTop;
        pendingUpdateRef.current = null;
      });
    },
    [scale],
  );

  const handleViewportWheel = useMemo(
    () => (event: WheelEvent, container: HTMLDivElement) => {
      if (event.ctrlKey) {
        event.preventDefault();
        const rect = container.getBoundingClientRect();
        const anchorX = event.clientX - rect.left;
        const anchorY = event.clientY - rect.top;
        const delta = normalizeWheelDelta(event, container);
        const nextScale = clampScale(
          scale * (1 - delta * DEFAULT_SCALE_CONFIG.intensity),
          DEFAULT_SCALE_CONFIG.min,
          DEFAULT_SCALE_CONFIG.max,
        );
        const update = computeScaleUpdate({
          currentScale: scale,
          nextScale,
          scrollLeft: container.scrollLeft,
          scrollTop: container.scrollTop,
          anchorX,
          anchorY,
        });
        applyScaleUpdate(update, container);
        return;
      }

      if (event.shiftKey) {
        event.preventDefault();
        container.scrollLeft += normalizeWheelDelta(event, container);
      }
    },
    [applyScaleUpdate, scale],
  );

  const handleViewportContainerMouseDown = useMemo(
    () => (event: MouseEvent, card: HTMLDivElement) => {
      if (card.contains(event.target as Node)) {
        return;
      }
      setActiveSlot(null);
    },
    [setActiveSlot],
  );

  const value = useMemo(
    () => ({
      scale,
      setScale: (value: number) =>
        setScale(
          clampScale(value, DEFAULT_SCALE_CONFIG.min, DEFAULT_SCALE_CONFIG.max),
        ),
      handleViewportWheel,
      handleViewportContainerMouseDown,
      applyScaleUpdate,
    }),
    [
      scale,
      handleViewportWheel,
      handleViewportContainerMouseDown,
      applyScaleUpdate,
    ],
  );

  return h(ViewportContext.Provider, { value }, children);
}

export function useViewport(): ViewportContextValue {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("useViewport must be used within ViewportProvider");
  }
  return context;
}
