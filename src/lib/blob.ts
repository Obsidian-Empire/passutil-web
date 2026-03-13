import { z } from "zod";

export const BlobAssetSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const BlobGroupSchema = z.object({
  type: z.string(),
  part: z.array(BlobAssetSchema),
});

export const BlobSectionSchema = z.object({
  items: z.array(BlobGroupSchema),
});

export const BlobItemSchema = z.object({
  type: z.string(),
  part: BlobAssetSchema,
});

export const BlobRootSchema = z.object({
  backgrounds: BlobSectionSchema,
  badges: BlobSectionSchema,
  banners: BlobSectionSchema,
  frames: BlobSectionSchema,
});

export type BlobAsset = z.infer<typeof BlobAssetSchema>;
export type BlobGroup = z.infer<typeof BlobGroupSchema>;
export type BlobSection = z.infer<typeof BlobSectionSchema>;
export type BlobItem = z.infer<typeof BlobItemSchema>;
export type BlobSchema = z.infer<typeof BlobRootSchema>;

const BLOB_REPO_URL =
  "https://raw.githubusercontent.com/Obsidian-Empire/passutil_assets/compressed/blob.json";

function formatZodIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "<root>";
      return `${path}: ${issue.message}`;
    })
    .join("; ");
}

// Schema data from repo
export default class Blob {
  backgrounds: BlobSection;
  badges: BlobSection;
  banners: BlobSection;
  frames: BlobSection;

  constructor(schema: BlobSchema) {
    this.backgrounds = schema.backgrounds;
    this.badges = schema.badges;
    this.banners = schema.banners;
    this.frames = schema.frames;
  }

  static async loadFromRepo(): Promise<Blob> {
    const response = await fetch(BLOB_REPO_URL);

    if (!response.ok) {
      throw new Error(
        `Blob schema: failed to fetch (${response.status} ${response.statusText})`,
      );
    }

    const data = (await response.json()) as unknown;
    const result = BlobRootSchema.safeParse(data);
    if (!result.success) {
      throw new Error(
        `Blob schema: invalid format (${formatZodIssues(result.error)})`,
      );
    }

    return new Blob(result.data);
  }
}
