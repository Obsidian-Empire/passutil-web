import { usePassportContext } from "./PassportContext";
import { SelectBox } from "../ui/select-box";

export function AvatarView() {
  const { user } = usePassportContext();

  return (
    <SelectBox type="avatar" aria-hidden="true" className="pointer-events-none">
      {user ? (
        <img className="h-full w-full object-cover" src={user} alt="" />
      ) : null}
    </SelectBox>
  );
}

export function AvatarEdit() {
  const { isSelected, selectSlot } = usePassportContext();

  return (
    <SelectBox
      type="avatar"
      data-selected={isSelected("avatar", 0) ? true : false}
      onClick={() => selectSlot("avatar", 0)}
      aria-label="Выбрать аватар"
      variant="bound_box"
    />
  );
}
