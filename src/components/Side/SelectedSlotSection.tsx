import { useSide } from "../../lib/side";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import { AvatarUploadSection } from "./AvatarUploadSection";
import { BackgroundGroupSection } from "./BackgroundGroupSection";
import { ExportButton } from "./ExportButton";
import { FriendUploadSection } from "./FriendUploadSection";
import { TextEditSection } from "./TextEditSection";
import { Button } from "../ui/button";

export function SelectedSlotSection() {
  const { activeSlot, handleClearSlot } = useSide();

  const slotLabels: Record<string, string> = {
    background: "Фон",
    frame: "Рамка",
    avatar: "Аватар",
    friend: "Друг",
    banner: "Баннер",
    main_badge: "Основной значок",
    common_badge: "Значок",
    text: "Текст",
  };

  return (
    <div className="flex flex-col gap-6 h-fit">
      {activeSlot ? (
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>
              {slotLabels[activeSlot.kind] ?? activeSlot.kind}
            </ItemTitle>
          </ItemContent>
          <ItemContent className="flex-none">
            <ItemDescription className="rounded-full bg-muted px-2 py-0.5 text-xs">
              {activeSlot.index + 1}
            </ItemDescription>
          </ItemContent>
        </Item>
      ) : (
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Слот не выбран</ItemTitle>
            <ItemDescription>выберите любой слот на карточке</ItemDescription>
          </ItemContent>
        </Item>
      )}
      <div className="flex items-center justify-between gap-2">
        {activeSlot ? (
          <Button
            variant="destructive"
            onClick={() => handleClearSlot(activeSlot)}
          >
            Очистить слот
          </Button>
        ) : (
          <div />
        )}
        <ExportButton />
      </div>

      <AvatarUploadSection />
      <FriendUploadSection />
      <TextEditSection />
      <BackgroundGroupSection />
    </div>
  );
}
