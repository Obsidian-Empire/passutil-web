import { usePassportContext } from "./PassportContext";
import { SlotEditItemShell, SlotViewItemShell } from "./SlotItemShell";

export function CommonBadgesView() {
  return (
    <div className="common-badges">
      {Array.from({ length: 20 }).map((_, index) => (
        <CommonBadgeViewItem key={`common-badge-${index}`} index={index} />
      ))}
    </div>
  );
}

export function CommonBadgesEdit() {
  return (
    <div className="common-badges">
      {Array.from({ length: 20 }).map((_, index) => (
        <CommonBadgeEditItem key={`common-badge-${index}`} index={index} />
      ))}
    </div>
  );
}

function CommonBadgeViewItem({ index }: { index: number }) {
  const { commonBadges } = usePassportContext();
  const badge = commonBadges[index];

  return (
    <SlotViewItemShell slotClassName="card_slot--common-badge">
      {badge ? (
        <img
          className="common-badge"
          src={badge.part.url}
          alt={badge.part.name}
        />
      ) : null}
    </SlotViewItemShell>
  );
}

function CommonBadgeEditItem({ index }: { index: number }) {
  const { commonBadges, isSelected, selectSlot } = usePassportContext();
  const badge = commonBadges[index];

  return (
    <SlotEditItemShell
      slotClassName="card_slot--common-badge"
      isSelected={isSelected("common_badge", index)}
      onClick={() => selectSlot("common_badge", index)}
      ariaLabel={`Выбрать общий значок ${index + 1}`}
    >
      {badge ? (
        <img
          className="common-badge common-badge--ghost"
          src={badge.part.url}
          alt=""
        />
      ) : null}
    </SlotEditItemShell>
  );
}
