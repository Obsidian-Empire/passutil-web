import { useSide } from "../../lib/side";
import { Button } from "../ui/button";

export function BackgroundGroupSection() {
  const { isBackgroundGroup, activeSlot, setActiveSlot } = useSide();

  if (!isBackgroundGroup) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/30 p-3">
      <div className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
        Связанные слоты
      </div>
      <div className="flex gap-2">
        <Button
          className={
            activeSlot?.kind === "background"
              ? "border-primary text-primary"
              : undefined
          }
          variant="outline"
          type="button"
          onClick={() => setActiveSlot({ kind: "background", index: 0 })}
        >
          Фон
        </Button>
        <Button
          className={
            activeSlot?.kind === "frame"
              ? "border-primary text-primary"
              : undefined
          }
          variant="outline"
          type="button"
          onClick={() => setActiveSlot({ kind: "frame", index: 0 })}
        >
          Рамка
        </Button>
      </div>
    </div>
  );
}
