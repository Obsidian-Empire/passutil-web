import { SelectBox } from "../ui/select-box";
import { usePassportContext } from "./PassportContext";

export function CommonBadgesView() {
  return (
    <SelectBox type="common-badges">
      {Array.from({ length: 20 }).map((_, index) => (
        <CommonBadgeViewItem key={`common-badge-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

export function CommonBadgesEdit() {
  return (
    <SelectBox type="common-badges" variant="bound_box">
      {Array.from({ length: 20 }).map((_, index) => (
        <CommonBadgeEditItem key={`common-badge-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

function CommonBadgeViewItem({ index }: { index: number }) {
  const { commonBadges } = usePassportContext();
  const badge = commonBadges[index];

  return (
    <SelectBox
      type="common-badge"
      className="cursor-pointer"
      aria-hidden="true"
    >
      {badge ? (
        <img
          className="common-badge"
          src={badge.part.url}
          alt={badge.part.name}
        />
      ) : null}
    </SelectBox>
  );
}

function CommonBadgeEditItem({ index }: { index: number }) {
  const { isSelected, selectSlot } = usePassportContext();

  return (
    <SelectBox
      type="common-badge"
      className="cursor-pointer"
      data-selected={isSelected("common_badge", index) ? true : false}
      onClick={() => selectSlot("common_badge", index)}
      aria-label={`Выбрать общий значок ${index + 1}`}
      variant="edit"
    />
  );
}
