import { useSide } from "../../lib/side";
import { useCardState } from "../../lib/state";

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

  return (
    <div className="side__section side__section--variants">
      <div className="side__title">Варианты</div>
      {!activeSlot ? (
        <div className="side__hint">Выбери слот, чтобы увидеть варианты.</div>
      ) : resolvedCategory ? (
        <div className="side__grid">
          {resolvedCategory.part.map((asset, index) => {
            const isSelected = selectedAssetUrl === asset.url;

            return (
              <button
                key={`${resolvedCategory.type}-${asset.name}-${index}`}
                className={`side__preview${isSelected ? " is-selected" : ""}`}
                type="button"
                onClick={() =>
                  applyBlobItemToSlot(activeSlot, {
                    type: resolvedCategory.type,
                    part: asset,
                  })
                }
                title={asset.name}
              >
                <img src={asset.url} alt={asset.name} />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="side__hint">Нет вариантов для выбранной категории.</div>
      )}
    </div>
  );
}
