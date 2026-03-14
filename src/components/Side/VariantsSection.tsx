import { useSide } from "../../lib/side";
import { useCardState } from "../../lib/state";
import { ScrollArea } from "../ui/scroll-area";

export function VariantsSection() {
  const { activeSlot, isTextEdit, resolvedCategory, applyBlobItemToSlot } =
    useSide();
  const { state } = useCardState();

  const selectedAssetUrl = (() => {
    if (!activeSlot) {
      return null;
    }

    switch (activeSlot.kind) {
      case "background":
        return state.selected.background?.part?.url ?? null;
      case "frame":
        return state.selected.frame?.part?.url ?? null;
      case "banner":
        return state.selected.banners?.[activeSlot.index]?.part?.url ?? null;
      case "main_badge":
        return (
          state.selected.main_badges?.[activeSlot.index]?.part?.url ?? null
        );
      case "common_badge":
        return (
          state.selected.common_badges?.[activeSlot.index]?.part?.url ?? null
        );
      default:
        return null;
    }
  })();

  if (
    activeSlot?.kind === "avatar" ||
    activeSlot?.kind === "friend" ||
    isTextEdit
  ) {
    return null;
  }

  const minTileSize = (() => {
    switch (activeSlot?.kind) {
      case "background":
      case "frame":
        return 120;
      case "banner":
        return 180;
      case "main_badge":
      case "common_badge":
        return 140;
      default:
        return 120;
    }
  })();

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Варианты
      </div>
      {!activeSlot ? (
        <div className="text-xs text-muted-foreground">
          Выбери слот, чтобы увидеть варианты.
        </div>
      ) : resolvedCategory ? (
        <ScrollArea className="min-h-0 w-full flex-1 rounded-lg border border-border p-2">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(auto-fill,minmax(${minTileSize}px,1fr))`,
            }}
          >
            {resolvedCategory.part.map((asset, index) => {
              const isSelected = selectedAssetUrl === asset.url;

              return (
                <button
                  key={`${resolvedCategory.type}-${asset.name}-${index}`}
                  className={`flex items-center justify-center rounded-lg border p-2 transition ${
                    isSelected
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-primary"
                  }`}
                  type="button"
                  onClick={() =>
                    applyBlobItemToSlot(activeSlot, {
                      type: resolvedCategory.type,
                      part: asset,
                    })
                  }
                  title={asset.name}
                >
                  <img
                    className={`h-auto w-full rounded-md object-contain min-h-[${minTileSize}]`}
                    src={asset.url}
                    alt={asset.name}
                  />
                </button>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <div className="text-xs text-muted-foreground">
          Нет вариантов для выбранной категории.
        </div>
      )}
    </div>
  );
}
