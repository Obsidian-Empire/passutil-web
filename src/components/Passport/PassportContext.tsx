import type { ReactNode } from "preact/compat";
import { createContext, useContext, useMemo } from "preact/compat";
import { useCardState, type CardSlotKind } from "../../lib/state";
import { useSide } from "../../lib/side";

type PassportContextValue = {
  nickname: string;
  entryTime: string;
  about: string;
  textColor: string;
  textFont: string;
  user?: string;
  friends: (string | null)[];
  backgroundUrl?: string;
  frameUrl?: string;
  banners: ({ part: { url: string; name: string } } | null)[];
  mainBadges: ({ part: { url: string; name: string } } | null)[];
  commonBadges: ({ part: { url: string; name: string } } | null)[];
  isSelected: (kind: CardSlotKind, index: number) => boolean;
  selectSlot: (kind: CardSlotKind, index: number) => void;
};

const PassportContext = createContext<PassportContextValue | undefined>(
  undefined,
);

export function PassportProvider({ children }: { children: ReactNode }) {
  const { state } = useCardState();
  const { activeSlot, setActiveSlot } = useSide();

  const value = useMemo<PassportContextValue>(() => {
    const {
      nickname,
      entry_time,
      about,
      textColor,
      textFont,
      friends,
      selected,
      user,
    } = state;
    return {
      nickname,
      entryTime: entry_time,
      about,
      textColor,
      textFont,
      user,
      friends,
      backgroundUrl: selected.background?.part.url,
      frameUrl: selected.frame?.part.url,
      banners: selected.banners ?? [],
      mainBadges: selected.main_badges ?? [],
      commonBadges: selected.common_badges ?? [],
      isSelected: (kind: CardSlotKind, index: number) =>
        activeSlot?.kind === kind && activeSlot.index === index,
      selectSlot: (kind: CardSlotKind, index: number) =>
        setActiveSlot({ kind, index }),
    };
  }, [state, activeSlot, setActiveSlot]);

  return (
    <PassportContext.Provider value={value}>
      {children}
    </PassportContext.Provider>
  );
}

export function usePassportContext(): PassportContextValue {
  const context = useContext(PassportContext);
  if (!context) {
    throw new Error("usePassportContext must be used within PassportProvider");
  }
  return context;
}
