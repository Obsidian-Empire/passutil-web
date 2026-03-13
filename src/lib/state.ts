import { BlobItemSchema } from "./blob";
import { h } from "preact";
import { z } from "zod";
import type { ReactNode } from "preact/compat";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "preact/compat";

const NullableBlobItemSchema = BlobItemSchema.nullable();
const NullableStringSchema = z.string().nullable();

export const CardSelectedSchema = z.object({
  background: BlobItemSchema.optional(),
  frame: BlobItemSchema.optional(),
  // Max 2
  banners: z.array(NullableBlobItemSchema).max(2).optional(),
  // Max 2
  main_badges: z.array(NullableBlobItemSchema).max(2).optional(),
  // Max 20
  common_badges: z.array(NullableBlobItemSchema).max(20).optional(),
});

export const CardStateDataSchema = z.object({
  nickname: z.string(),
  entry_time: z.string(),
  about: z.string(),
  user: z.string().optional(),
  friends: z.array(NullableStringSchema).max(14),
  selected: CardSelectedSchema,
});

const StoredCardStatePayloadSchema = CardStateDataSchema.partial();

export type CardSelected = z.infer<typeof CardSelectedSchema>;

export type CardSlotKind =
  | "background"
  | "frame"
  | "avatar"
  | "friend"
  | "text"
  | "banner"
  | "main_badge"
  | "common_badge";

export interface CardSlotId {
  kind: CardSlotKind;
  index: number;
}

export type CardStateData = z.infer<typeof CardStateDataSchema>;

export const CARD_STATE_STORAGE_KEY = "card_state_v1";

const DEFAULT_CARD_STATE: CardStateData = {
  nickname: "",
  entry_time: "",
  about: "",
  friends: [],
  selected: {},
};

export function createDefaultCardState(): CardStateData {
  return {
    nickname: DEFAULT_CARD_STATE.nickname,
    entry_time: DEFAULT_CARD_STATE.entry_time,
    about: DEFAULT_CARD_STATE.about,
    friends: [],
    selected: {},
  };
}

function formatZodIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "<root>";
      return `${path}: ${issue.message}`;
    })
    .join("; ");
}

function parseStoredCardState(value: unknown): CardStateData | null {
  const result = StoredCardStatePayloadSchema.safeParse(value);
  if (!result.success) {
    console.warn("[card-state] invalid payload", formatZodIssues(result.error));
    return null;
  }

  const fallback = createDefaultCardState();
  const parsed = result.data;

  return {
    ...fallback,
    ...parsed,
    friends: parsed.friends ?? fallback.friends,
    selected: parsed.selected ?? fallback.selected,
  };
}

export function loadCardStateFromStorage(): CardStateData {
  if (
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined"
  ) {
    return createDefaultCardState();
  }

  const raw = window.localStorage.getItem(CARD_STATE_STORAGE_KEY);
  console.debug("[card-state] load raw", raw);
  if (!raw) {
    return createDefaultCardState();
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const state = parseStoredCardState(parsed);
    console.debug("[card-state] load parsed", parsed);
    console.debug("[card-state] load validated", state);
    return state ?? createDefaultCardState();
  } catch (error) {
    console.error("[card-state] load failed", error);
    return createDefaultCardState();
  }
}

export function persistCardState(state: CardStateData): void {
  if (
    typeof window === "undefined" ||
    typeof window.localStorage === "undefined"
  ) {
    return;
  }

  const serialized = JSON.stringify(state);
  window.localStorage.setItem(CARD_STATE_STORAGE_KEY, serialized);
  console.debug("[card-state] persist", serialized, state);
}

// Local state of card
export default class CardState implements CardStateData {
  nickname: string;
  entry_time: string;
  about: string;
  friends: (string | null)[];
  selected: CardSelected;

  constructor(initial?: Partial<CardStateData>) {
    this.nickname = initial?.nickname ?? "";
    this.entry_time = initial?.entry_time ?? "";
    this.about = initial?.about ?? "";
    this.friends = initial?.friends ?? [];
    this.selected = initial?.selected ? { ...initial.selected } : {};
  }

  static fromStorage(): CardState {
    return new CardState(loadCardStateFromStorage());
  }
}

export interface CardStateContextValue {
  state: CardStateData;
  setState: (
    value: CardStateData | ((prev: CardStateData) => CardStateData),
  ) => void;
  updateState: (patch: Partial<CardStateData>) => void;
  setUserAvatar: (file: File) => Promise<void>;
  setFriendImage: (index: number, file: File) => Promise<void>;
  clearFriendImage: (index: number) => void;
}

const CardStateContext = createContext<CardStateContextValue | undefined>(
  undefined,
);

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CardStateData>(() =>
    loadCardStateFromStorage(),
  );

  const fileToWebpBase64 = useMemo(
    () => async (file: File) => {
      if (typeof window === "undefined") {
        return null;
      }

      const sourceImage = await new Promise<HTMLImageElement>(
        (resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = () => reject(new Error("FileReader failed"));
          reader.onload = () => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error("Failed to load image"));
            image.src = reader.result as string;
          };
          reader.readAsDataURL(file);
        },
      );

      const canvas = document.createElement("canvas");
      canvas.width = sourceImage.naturalWidth || sourceImage.width;
      canvas.height = sourceImage.naturalHeight || sourceImage.height;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas 2D context is not available");
      }

      context.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);

      const webpBase64 = await new Promise<string>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("image/webp is not supported by this browser"));
              return;
            }

            const reader = new FileReader();
            reader.onerror = () => reject(new Error("FileReader failed"));
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          },
          "image/webp",
          0.92,
        );
      });

      return webpBase64;
    },
    [],
  );

  const setUserAvatar = useMemo(
    () => async (file: File) => {
      const webpBase64 = await fileToWebpBase64(file);
      if (!webpBase64) {
        return;
      }

      setState((prev) => ({
        ...prev,
        user: webpBase64,
      }));
    },
    [fileToWebpBase64],
  );

  const setFriendName = useMemo(
    () => (index: number) => {
      setState((prev) => {
        const nextFriends = [...prev.friends];
        const clampedIndex = Math.max(0, Math.min(13, index));
        while (nextFriends.length <= clampedIndex) {
          nextFriends.push(null);
        }
        const existing = nextFriends[clampedIndex] ?? null;
        nextFriends[clampedIndex] = existing;
        return { ...prev, friends: nextFriends.slice(0, 14) };
      });
    },
    [],
  );

  const setFriendImage = useMemo(
    () => async (index: number, file: File) => {
      const webpBase64 = await fileToWebpBase64(file);
      if (!webpBase64) {
        return;
      }

      setState((prev) => {
        const nextFriends = [...prev.friends];
        const clampedIndex = Math.max(0, Math.min(13, index));
        while (nextFriends.length <= clampedIndex) {
          nextFriends.push(null);
        }
        nextFriends[clampedIndex] = webpBase64;
        return { ...prev, friends: nextFriends.slice(0, 14) };
      });
    },
    [fileToWebpBase64],
  );

  const clearFriendImage = useMemo(
    () => (index: number) => {
      setState((prev) => {
        const nextFriends = [...prev.friends];
        const clampedIndex = Math.max(0, Math.min(13, index));
        while (nextFriends.length <= clampedIndex) {
          nextFriends.push(null);
        }
        nextFriends[clampedIndex] = null;
        return { ...prev, friends: nextFriends.slice(0, 14) };
      });
    },
    [],
  );

  useEffect(() => {
    persistCardState(state);
  }, [state]);

  const updateState = useMemo(
    () => (patch: Partial<CardStateData>) => {
      setState((prev) => ({
        ...prev,
        ...patch,
        selected: patch.selected
          ? { ...prev.selected, ...patch.selected }
          : prev.selected,
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      state,
      setState,
      updateState,
      setUserAvatar,
      setFriendName,
      setFriendImage,
      clearFriendImage,
    }),
    [
      state,
      updateState,
      setUserAvatar,
      setFriendName,
      setFriendImage,
      clearFriendImage,
    ],
  );

  return h(CardStateContext.Provider, { value }, children);
}

export function useCardState(): CardStateContextValue {
  const context = useContext(CardStateContext);
  if (!context) {
    throw new Error("useCardState must be used within StateProvider");
  }
  return context;
}
