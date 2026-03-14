import domtoimage from "dom-to-image";

export interface GenerateCardWebpOptions {
  selector?: string;
  quality?: number;
  filter?: (node: HTMLElement) => boolean;
}

function assertBrowserAvailable(): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error(
      "generateCardWebpUrl can only run in a browser environment",
    );
  }
}

async function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image from blob"));
      image.src = url;
    });
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function drawBlobToCanvas(
  blob: Blob,
  width: number,
  height: number,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context is not available");
  }

  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(blob);
    context.drawImage(bitmap, 0, 0, width, height);
    if ("close" in bitmap) {
      bitmap.close();
    }
    return canvas;
  }

  const image = await loadImageFromBlob(blob);
  context.drawImage(image, 0, 0, width, height);
  return canvas;
}

async function canvasToWebp(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("image/webp is not supported by this browser"));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      quality,
    );
  });
}

/**
 * Generates a WEBP image from the `.card` element and returns a blob URL.
 *
 * IMPORTANT: remember to call URL.revokeObjectURL(url) when the preview is no longer needed.
 */
export async function generateCardWebpUrl(
  options: GenerateCardWebpOptions = {},
): Promise<string> {
  assertBrowserAvailable();

  const selector = options.selector ?? ".card";
  const node = document.querySelector<HTMLElement>(selector);
  if (!node) {
    throw new Error(`Element not found for selector: ${selector}`);
  }

  const rect = node.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    throw new Error("Element has zero size and cannot be rendered");
  }

  const quality = Math.min(1, Math.max(0, options.quality || 80));
  const width = 1600;
  const height = 900;

  const blob = await domtoimage.toBlob(node, {
    filter: options.filter,
    width,
    height,
    style: {
      transformOrigin: "top left",
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    },
  });

  const canvas = await drawBlobToCanvas(blob, width, height);
  const webpBlob = await canvasToWebp(canvas, quality);
  const url = URL.createObjectURL(webpBlob);

  window.open(url, "_blank", "noopener,noreferrer");

  return url;
}
