import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";
import { Input } from "../ui/input";

export function FriendUploadSection() {
  const { setFriendImage } = useCardState();
  const { activeSlot, friendError, setFriendError } = useSide();

  if (activeSlot?.kind !== "friend") {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Изображение</span>
        <Input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={async (event) => {
            const input = event.currentTarget;
            const file = input.files?.[0];
            if (!file) {
              return;
            }

            try {
              setFriendError(null);
              await setFriendImage(activeSlot.index, file);
            } catch (error) {
              setFriendError(
                error instanceof Error
                  ? error.message
                  : "Ошибка загрузки друга",
              );
            } finally {
              input.value = "";
            }
          }}
        />
      </label>
      {friendError ? (
        <span className="text-xs text-destructive">{friendError}</span>
      ) : null}
    </div>
  );
}
