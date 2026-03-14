import { SelectBox } from "../ui/select-box";
import { usePassportContext } from "./PassportContext";

export function MainBadgesView() {
  return (
    <SelectBox type="main-badges">
      {Array.from({ length: 2 }).map((_, index) => (
        <MainBadgeViewItem key={`main-badge-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

export function MainBadgesEdit() {
  return (
    <SelectBox type="main-badges" variant="bound_box">
      {Array.from({ length: 2 }).map((_, index) => (
        <MainBadgeEditItem key={`main-badge-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

function MainBadgeViewItem({ index }: { index: number }) {
  const { mainBadges } = usePassportContext();
  const badge = mainBadges[index];

  return (
    <SelectBox type="main-badge" className="cursor-pointer" aria-hidden="true">
      {badge ? <img src={badge.part.url} alt={badge.part.name} /> : null}
    </SelectBox>
  );
}

function MainBadgeEditItem({ index }: { index: number }) {
  const { isSelected, selectSlot } = usePassportContext();

  return (
    <SelectBox
      type="main-badge"
      className="cursor-pointer"
      data-selected={isSelected("main_badge", index) ? true : false}
      onClick={() => selectSlot("main_badge", index)}
      aria-label={`Выбрать основной значок ${index + 1}`}
      variant="edit"
    />
  );
}
