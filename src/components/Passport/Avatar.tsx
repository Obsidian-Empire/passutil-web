import { usePassportContext } from "./PassportContext";

export function AvatarView() {
  const { user } = usePassportContext();

  return (
    <div
      className="card_slot card_slot--avatar card_slot--display"
      aria-hidden="true"
    >
      {user ? <img className="card_avatar" src={user} alt="" /> : null}
    </div>
  );
}

export function AvatarEdit() {
  const { user, isSelected, selectSlot } = usePassportContext();

  return (
    <button
      className={`card_slot card_slot--avatar${
        isSelected("avatar", 0) ? " is-selected" : ""
      }`}
      type="button"
      onClick={() => selectSlot("avatar", 0)}
      aria-label="Выбрать аватар"
    >
      {user ? (
        <img className="card_avatar card_avatar--ghost" src={user} alt="" />
      ) : null}
    </button>
  );
}
