import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";

export function AvatarUploadSection() {
  const { setUserAvatar } = useCardState();
  const { activeSlot, avatarError, setAvatarError } = useSide();

  if (activeSlot?.kind !== "avatar") {
    return null;
  }

  return (
    <label className="side__upload">
      <span className="side__upload-title">Загрузить аватар</span>
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
            setAvatarError(null);
            await setUserAvatar(file);
          } catch (error) {
            setAvatarError(
              error instanceof Error
                ? error.message
                : "Ошибка загрузки аватара",
            );
          } finally {
            input.value = "";
          }
        }}
      />
      {avatarError ? (
        <span className="side__hint side__hint--error">{avatarError}</span>
      ) : null}
    </label>
  );
}
