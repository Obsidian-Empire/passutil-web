import { usePassportContext } from "./PassportContext";
import { SlotEditItemShell, SlotViewItemShell } from "./SlotItemShell";

export function MainBadgesView() {
  return (
    <div className="main-badges">
      {Array.from({ length: 2 }).map((_, index) => (
        <MainBadgeViewItem key={`main-badge-${index}`} index={index} />
      ))}
    </div>
  );
}

export function MainBadgesEdit() {
  return (
    <div className="main-badges">
      {Array.from({ length: 2 }).map((_, index) => (
        <MainBadgeEditItem key={`main-badge-${index}`} index={index} />
      ))}
    </div>
  );
}

function MainBadgeViewItem({ index }: { index: number }) {
  const { mainBadges } = usePassportContext();
  const badge = mainBadges[index];

  return (
    <SlotViewItemShell slotClassName="card_slot--main-badge">
      {badge ? (
        <img
          className="main-badge"
          src={badge.part.url}
          alt={badge.part.name}
        />
      ) : null}
    </SlotViewItemShell>
  );
}

function MainBadgeEditItem({ index }: { index: number }) {
  const { mainBadges, isSelected, selectSlot } = usePassportContext();
  const badge = mainBadges[index];

  return (
    <SlotEditItemShell
      slotClassName="card_slot--main-badge"
      isSelected={isSelected("main_badge", index)}
      onClick={() => selectSlot("main_badge", index)}
      ariaLabel={`Выбрать основной значок ${index + 1}`}
    >
      {badge ? (
        <img
          className="main-badge main-badge--ghost"
          src={badge.part.url}
          alt=""
        />
      ) : null}
    </SlotEditItemShell>
  );
}
