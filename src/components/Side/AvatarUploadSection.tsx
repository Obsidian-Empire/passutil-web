import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";
import { Input } from "../ui/input";

export function AvatarUploadSection() {
  const { setUserAvatar } = useCardState();
  const { activeSlot, avatarError, setAvatarError } = useSide();

  if (activeSlot?.kind !== "avatar") {
    return null;
  }

  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Загрузить аватар</span>
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
        <span className="text-xs text-destructive">{avatarError}</span>
      ) : null}
    </label>
  );
}
