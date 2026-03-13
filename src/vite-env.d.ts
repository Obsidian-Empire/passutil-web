/// <reference types="vite/client" />

declare module "dom-to-image" {
  export interface DomToImageOptions {
    filter?: (node: HTMLElement) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
  }

  const domtoimage: {
    toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toJpeg(node: HTMLElement, options?: DomToImageOptions & { quality?: number }): Promise<string>;
    toSvg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toBlob(node: HTMLElement, options?: DomToImageOptions): Promise<Blob>;
    toPixelData(node: HTMLElement, options?: DomToImageOptions): Promise<Uint8Array>;
  };

  export default domtoimage;
}
