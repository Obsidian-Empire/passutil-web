import { h } from "preact";
import type { ReactNode } from "preact/compat";
import { createContext, useContext, useMemo, useState } from "preact/compat";
import { useSide } from "./side";
import {
  DEFAULT_SCALE_CONFIG,
  clampScale,
  computeWheelScaleUpdate,
} from "./side-scale";

export interface ViewportContextValue {
  scale: number;
  setScale: (value: number) => void;
  handleViewportWheel: (event: WheelEvent, container: HTMLDivElement) => void;
  handleViewportContainerMouseDown: (
    event: MouseEvent,
    card: HTMLDivElement,
  ) => void;
}

const ViewportContext = createContext<ViewportContextValue | undefined>(
  undefined,
);

export function ViewportProvider({ children }: { children: ReactNode }) {
  const { setActiveSlot } = useSide();
  const [scale, setScale] = useState(0.8);

  const handleViewportWheel = useMemo(
    () => (event: WheelEvent, container: HTMLDivElement) => {
      if (event.ctrlKey) {
        event.preventDefault();
        const update = computeWheelScaleUpdate({
          currentScale: scale,
          deltaY: event.deltaY,
          scrollLeft: container.scrollLeft,
          scrollTop: container.scrollTop,
          clientWidth: container.clientWidth,
          clientHeight: container.clientHeight,
          min: DEFAULT_SCALE_CONFIG.min,
          max: DEFAULT_SCALE_CONFIG.max,
          intensity: DEFAULT_SCALE_CONFIG.intensity,
        });

        if (update.nextScale === scale) {
          return;
        }

        setScale(update.nextScale);
        requestAnimationFrame(() => {
          container.scrollLeft = update.nextScrollLeft;
          container.scrollTop = update.nextScrollTop;
        });
        return;
      }

      if (event.shiftKey) {
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      }
    },
    [scale],
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
    }),
    [scale, handleViewportWheel, handleViewportContainerMouseDown],
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
