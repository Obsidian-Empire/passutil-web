import { useSide } from "../../lib/side";

export function VariantsSection() {
  const { activeSlot, isTextEdit, resolvedCategory, applyBlobItemToSlot } =
    useSide();

  if (
    activeSlot?.kind === "avatar" ||
    activeSlot?.kind === "friend" ||
    isTextEdit
  ) {
    return null;
  }

  return (
    <div className="side__section">
      <div className="side__title">Варианты</div>
      {!activeSlot ? (
        <div className="side__hint">Выбери слот, чтобы увидеть варианты.</div>
      ) : resolvedCategory ? (
        <div className="side__grid">
          {resolvedCategory.part.map((asset, index) => (
            <button
              key={`${resolvedCategory.type}-${asset.name}-${index}`}
              className="side__preview"
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
          ))}
        </div>
      ) : (
        <div className="side__hint">Нет вариантов для выбранной категории.</div>
      )}
    </div>
  );
}
