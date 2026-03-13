export interface ScaleUpdate {
  nextScale: number;
  nextScrollLeft: number;
  nextScrollTop: number;
}

export const DEFAULT_SCALE_CONFIG = {
  min: 0.5,
  max: 3,
  intensity: 0.0015,
} as const;

export function clampScale(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function computeScaleUpdate(params: {
  currentScale: number;
  nextScale: number;
  scrollLeft: number;
  scrollTop: number;
  anchorX: number;
  anchorY: number;
}): ScaleUpdate {
  const ratio = params.nextScale / params.currentScale;
  const contentX = params.scrollLeft + params.anchorX;
  const contentY = params.scrollTop + params.anchorY;

  return {
    nextScale: params.nextScale,
    nextScrollLeft: contentX * ratio - params.anchorX,
    nextScrollTop: contentY * ratio - params.anchorY,
  };
}
