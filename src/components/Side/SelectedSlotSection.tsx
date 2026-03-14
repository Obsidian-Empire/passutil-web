import { useSide } from "../../lib/side";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";
import { AvatarUploadSection } from "./AvatarUploadSection";
import { BackgroundGroupSection } from "./BackgroundGroupSection";
import { ExportButton } from "./ExportButton";
import { FriendUploadSection } from "./FriendUploadSection";
import { TextEditSection } from "./TextEditSection";
import { Button } from "../ui/button";
import { DrawerHeader } from "../ui/drawner";

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
    <DrawerHeader>
      {activeSlot ? (
        <Item>
          <ItemContent>
            <ItemTitle>
              {slotLabels[activeSlot.kind] ?? activeSlot.kind}
            </ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemTitle></ItemTitle>
          </ItemContent>
          <ItemContent className="flex-none text-center">
            <ItemDescription>{activeSlot.index + 1}</ItemDescription>
          </ItemContent>
        </Item>
      ) : (
        <Item>
          <ItemContent>
            <ItemTitle>Слот не выбран</ItemTitle>
            <ItemDescription>выберите любой слот на карточке</ItemDescription>
          </ItemContent>
        </Item>
      )}
      <div className="flex justify-between">
        {activeSlot ? (
          <Button onClick={() => handleClearSlot(activeSlot)}>
            Очистить слот
          </Button>
        ) : null}
        <ExportButton />
      </div>

      <AvatarUploadSection />
      <FriendUploadSection />
      <TextEditSection />
      <BackgroundGroupSection />
    </DrawerHeader>
  );
}
