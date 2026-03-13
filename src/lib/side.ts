import { h } from "preact";
import type { ReactNode } from "preact/compat";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "preact/compat";
import Blob, { type BlobItem, type BlobSection } from "./blob";
import { useCardState, type CardSlotId, type CardStateData } from "./state";
import { exportCardWebp } from "./side-export";

type BlobStatus = "idle" | "loading" | "ready" | "error";

export interface SideContextValue {
  blob: Blob | null;
  blobStatus: BlobStatus;
  blobError: string | null;
  activeSlot: CardSlotId | null;
  setActiveSlot: (slot: CardSlotId | null) => void;
  activeCategory: string | null;
  setActiveCategory: (value: string | null) => void;
  avatarError: string | null;
  setAvatarError: (value: string | null) => void;
  friendError: string | null;
  setFriendError: (value: string | null) => void;
  isExporting: boolean;
  exportCard: () => Promise<void>;
  section: BlobSection | null;
  categories: { type: string; part: { name: string; url: string }[] }[];
  resolvedCategory: {
    type: string;
    part: { name: string; url: string }[];
  } | null;
  isBackgroundGroup: boolean;
  applyBlobItemToSlot: (slot: CardSlotId, item: BlobItem) => void;
  clearSlot: (slot: CardSlotId) => void;
  handleClearSlot: (slot: CardSlotId | null) => void;
}

const SideContext = createContext<SideContextValue | undefined>(undefined);

export function SideProvider({ children }: { children: ReactNode }) {
  const { setState } = useCardState();
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobStatus, setBlobStatus] = useState<BlobStatus>("idle");
  const [blobError, setBlobError] = useState<string | null>(null);
  const [activeSlot, setActiveSlot] = useState<CardSlotId | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [friendError, setFriendError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    let active = true;

    const loadBlob = async () => {
      setBlobStatus("loading");
      setBlobError(null);

      try {
        const data = await Blob.loadFromRepo();
        if (!active) {
          return;
        }
        setBlob(data);
        setBlobStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }
        setBlob(null);
        setBlobStatus("error");
        setBlobError(
          error instanceof Error ? error.message : "Blob load failed",
        );
      }
    };

    loadBlob();

    return () => {
      active = false;
    };
  }, []);

  const applyBlobItemToSlot = useMemo(
    () => (slot: CardSlotId, item: BlobItem) => {
      setState((prev: CardStateData) => {
        switch (slot.kind) {
          case "background":
            return {
              ...prev,
              selected: { ...prev.selected, background: item },
            };
          case "frame":
            return { ...prev, selected: { ...prev.selected, frame: item } };
          case "avatar":
          case "friend":
            return prev;
          case "banner": {
            const banners = [...(prev.selected.banners ?? [])];
            while (banners.length <= slot.index) {
              banners.push(null);
            }
            banners[slot.index] = item;
            return { ...prev, selected: { ...prev.selected, banners } };
          }
          case "main_badge": {
            const mainBadges = [...(prev.selected.main_badges ?? [])];
            while (mainBadges.length <= slot.index) {
              mainBadges.push(null);
            }
            mainBadges[slot.index] = item;
            return {
              ...prev,
              selected: { ...prev.selected, main_badges: mainBadges },
            };
          }
          case "common_badge": {
            const commonBadges = [...(prev.selected.common_badges ?? [])];
            while (commonBadges.length <= slot.index) {
              commonBadges.push(null);
            }
            commonBadges[slot.index] = item;
            return {
              ...prev,
              selected: { ...prev.selected, common_badges: commonBadges },
            };
          }
          default:
            return prev;
        }
      });
    },
    [setState],
  );

  const clearSlot = useMemo(
    () => (slot: CardSlotId) => {
      setState((prev: CardStateData) => {
        switch (slot.kind) {
          case "background": {
            const { background, ...rest } = prev.selected;
            return { ...prev, selected: rest };
          }
          case "frame": {
            const { frame, ...rest } = prev.selected;
            return { ...prev, selected: rest };
          }
          case "avatar": {
            const { user, ...rest } = prev;
            return { ...rest };
          }
          case "friend": {
            const nextFriends = [...prev.friends];
            const clampedIndex = Math.max(0, Math.min(13, slot.index));
            while (nextFriends.length <= clampedIndex) {
              nextFriends.push(null);
            }
            nextFriends[clampedIndex] = null;
            return { ...prev, friends: nextFriends.slice(0, 14) };
          }
          case "banner": {
            const banners = [...(prev.selected.banners ?? [])];
            while (banners.length <= slot.index) {
              banners.push(null);
            }
            banners[slot.index] = null;
            const nextSelected = { ...prev.selected, banners };
            return { ...prev, selected: nextSelected };
          }
          case "main_badge": {
            const mainBadges = [...(prev.selected.main_badges ?? [])];
            while (mainBadges.length <= slot.index) {
              mainBadges.push(null);
            }
            mainBadges[slot.index] = null;
            const nextSelected = { ...prev.selected, main_badges: mainBadges };
            return { ...prev, selected: nextSelected };
          }
          case "common_badge": {
            const commonBadges = [...(prev.selected.common_badges ?? [])];
            while (commonBadges.length <= slot.index) {
              commonBadges.push(null);
            }
            commonBadges[slot.index] = null;
            const nextSelected = {
              ...prev.selected,
              common_badges: commonBadges,
            };
            return { ...prev, selected: nextSelected };
          }
          default:
            return prev;
        }
      });
    },
    [setState],
  );

  const exportCard = useMemo(
    () => async () => {
      await exportCardWebp({
        onStart: () => {
          setIsExporting(true);
          document.documentElement.classList.add("is-exporting-card");
        },
        onFinish: () => {
          document.documentElement.classList.remove("is-exporting-card");
          setIsExporting(false);
        },
      });
    },
    [],
  );

  const isBackgroundGroup =
    activeSlot?.kind === "background" || activeSlot?.kind === "frame";

  const section: BlobSection | null = useMemo(() => {
    if (!activeSlot || !blob) {
      return null;
    }
    switch (activeSlot.kind) {
      case "background":
        return blob.backgrounds;
      case "frame":
        return blob.frames;
      case "banner":
        return blob.banners;
      case "main_badge":
      case "common_badge":
      default:
        return blob.badges;
    }
  }, [activeSlot, blob]);

  const categories = useMemo(() => section?.items ?? [], [section]);

  const resolvedCategory = useMemo(() => {
    if (!categories.length) {
      return null;
    }
    const matched = activeCategory
      ? categories.find((item) => item.type === activeCategory)
      : null;
    return matched ?? categories[0];
  }, [section, activeCategory]);

  const handleClearSlot = useMemo(
    () => (slot: CardSlotId | null) => {
      if (!slot) {
        return;
      }
      clearSlot(slot);
    },
    [clearSlot],
  );

  const value = useMemo(
    () => ({
      blob,
      blobStatus,
      blobError,
      activeSlot,
      setActiveSlot,
      activeCategory,
      setActiveCategory,
      avatarError,
      setAvatarError,
      friendError,
      setFriendError,
      isExporting,
      exportCard,
      section,
      categories,
      resolvedCategory,
      isBackgroundGroup,
      applyBlobItemToSlot,
      clearSlot,
      handleClearSlot,
    }),
    [
      blob,
      blobStatus,
      blobError,
      activeSlot,
      activeCategory,
      avatarError,
      friendError,
      isExporting,
      exportCard,
      section,
      categories,
      resolvedCategory,
      isBackgroundGroup,
      applyBlobItemToSlot,
      clearSlot,
      handleClearSlot,
    ],
  );

  return h(SideContext.Provider, { value }, children);
}

export function useSide(): SideContextValue {
  const context = useContext(SideContext);
  if (!context) {
    throw new Error("useSide must be used within SideProvider");
  }
  return context;
}
