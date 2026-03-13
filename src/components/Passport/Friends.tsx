import { usePassportContext } from "./PassportContext";
import { SlotEditItemShell, SlotViewItemShell } from "./SlotItemShell";

export function FriendsView() {
  return (
    <div className="friends">
      {Array.from({ length: 14 }).map((_, index) => (
        <FriendsViewItem key={`friend-display-${index}`} index={index} />
      ))}
    </div>
  );
}

export function FriendsEdit() {
  return (
    <div className="friends">
      {Array.from({ length: 14 }).map((_, index) => (
        <FriendsEditItem key={`friend-${index}`} index={index} />
      ))}
    </div>
  );
}

function FriendsViewItem({ index }: { index: number }) {
  const { friends } = usePassportContext();
  const friend = friends[index];

  return (
    <SlotViewItemShell slotClassName="card_slot--friend">
      {friend ? (
        <img className="avatar" src={friend} alt={index.toString()} />
      ) : null}
    </SlotViewItemShell>
  );
}

function FriendsEditItem({ index }: { index: number }) {
  const { friends, isSelected, selectSlot } = usePassportContext();

  return (
    <SlotEditItemShell
      slotClassName="card_slot--friend"
      isSelected={isSelected("friend", index)}
      onClick={() => selectSlot("friend", index)}
      ariaLabel={`Выбрать друга ${index + 1}`}
    >
      {friends[index] ? (
        <img className="avatar avatar--ghost" src={friends[index]} alt="" />
      ) : null}
    </SlotEditItemShell>
  );
}
