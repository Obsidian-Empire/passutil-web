import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";

export function FriendUploadSection() {
  const { setFriendImage } = useCardState();
  const { activeSlot, friendError, setFriendError } = useSide();

  if (activeSlot?.kind !== "friend") {
    return null;
  }

  return (
    <div className="side__upload">
      <label className="side__select">
        <span className="side__select-label">Изображение</span>
        <input
          className="side__upload-input"
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
        <span className="side__hint side__hint--error">{friendError}</span>
      ) : null}
    </div>
  );
}
