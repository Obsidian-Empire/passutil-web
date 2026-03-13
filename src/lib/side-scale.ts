export interface WheelScaleUpdate {
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

export function computeWheelScaleUpdate(params: {
  currentScale: number;
  deltaY: number;
  scrollLeft: number;
  scrollTop: number;
  clientWidth: number;
  clientHeight: number;
  min: number;
  max: number;
  intensity: number;
}): WheelScaleUpdate {
  const centerX = params.scrollLeft + params.clientWidth / 2;
  const centerY = params.scrollTop + params.clientHeight / 2;

  const nextScale = clampScale(
    params.currentScale * (1 - params.deltaY * params.intensity),
    params.min,
    params.max,
  );

  const ratio = nextScale / params.currentScale;
  const nextScrollLeft = centerX * ratio - params.clientWidth / 2;
  const nextScrollTop = centerY * ratio - params.clientHeight / 2;

  return {
    nextScale,
    nextScrollLeft,
    nextScrollTop,
  };
}
