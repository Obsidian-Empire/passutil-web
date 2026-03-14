import { SelectBox } from "../ui/select-box";
import { usePassportContext } from "./PassportContext";

export function FriendsView() {
  return (
    <SelectBox type="friend">
      {Array.from({ length: 14 }).map((_, index) => (
        <FriendsViewItem key={`friend-display-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

export function FriendsEdit() {
  return (
    <SelectBox variant="bound_box" type="friend">
      {Array.from({ length: 14 }).map((_, index) => (
        <FriendsEditItem key={`friend-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

function FriendsViewItem({ index }: { index: number }) {
  const { friends } = usePassportContext();
  const friend = friends[index];

  return (
    <SelectBox type="friend_item" className="cursor-pointer" aria-hidden="true">
      {friend ? (
        <img
          className="w-full h-full object-cover"
          src={friend}
          alt={index.toString()}
        />
      ) : null}
    </SelectBox>
  );
}

function FriendsEditItem({ index }: { index: number }) {
  const { isSelected, selectSlot } = usePassportContext();

  return (
    <SelectBox
      type="friend_item"
      className="cursor-pointer"
      data-selected={isSelected("friend", index) ? true : false}
      onClick={() => selectSlot("friend", index)}
      aria-label={`Выбрать друга ${index + 1}`}
      variant="edit"
    />
  );
}
