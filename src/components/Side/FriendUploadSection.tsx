import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";

export function FriendUploadSection() {
  const { setFriendImage, clearFriendImage } = useCardState();
  const { activeSlot, friendError, setFriendError } = useSide();

  if (activeSlot?.kind !== "friend") {
    return null;
  }

  return (
    <div className="side__upload">
      <span className="side__upload-title">Friend</span>
      <label className="side__select">
        <span className="side__select-label">Имя</span>
      </label>
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
      <button
        className="side__clear"
        type="button"
        onClick={() => clearFriendImage(activeSlot.index)}
      >
        Удалить изображение
      </button>
      {friendError ? (
        <span className="side__hint side__hint--error">{friendError}</span>
      ) : null}
    </div>
  );
}
