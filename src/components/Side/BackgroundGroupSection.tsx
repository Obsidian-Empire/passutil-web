import { useSide } from "../../lib/side";

export function BackgroundGroupSection() {
  const { isBackgroundGroup, activeSlot, setActiveSlot } = useSide();

  if (!isBackgroundGroup) {
    return null;
  }

  return (
    <div className="side__group">
      <div className="side__group-title">Связанные слоты</div>
      <div className="side__group-actions">
        <button
          className={`side__group-button${activeSlot?.kind === "background" ? " is-active" : ""}`}
          type="button"
          onClick={() => setActiveSlot({ kind: "background", index: 0 })}
        >
          Фон
        </button>
        <button
          className={`side__group-button${activeSlot?.kind === "frame" ? " is-active" : ""}`}
          type="button"
          onClick={() => setActiveSlot({ kind: "frame", index: 0 })}
        >
          Рамка
        </button>
      </div>
    </div>
  );
}
