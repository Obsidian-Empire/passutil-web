import { usePassportContext } from "./PassportContext";
import { useSide } from "../../lib/side";
import { SlotEditItemShell } from "./SlotItemShell";

export function TextView() {
  const { nickname, entryTime, about } = usePassportContext();

  return (
    <div className="text">
      <div className="text-nickname">{nickname}</div>
      <div className="text-entry-time">{entryTime}</div>
      <div className="text-about">{about}</div>
    </div>
  );
}

export function TextEdit() {
  const { isSelected } = usePassportContext();
  const { setTextEdit } = useSide();

  return (
    <SlotEditItemShell
      slotClassName="card_slot--text text"
      isSelected={isSelected("text", 0)}
      onClick={setTextEdit}
      ariaLabel="Выбрать текстовый блок"
    />
  );
}
