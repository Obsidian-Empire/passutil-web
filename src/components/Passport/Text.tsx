import { usePassportContext } from "./PassportContext";
import { useSide } from "../../lib/side";
import { SelectBox } from "../ui/select-box";

export function TextView() {
  const { nickname, entryTime, about } = usePassportContext();

  return (
    <SelectBox type="text" aria-hidden="true" className="text">
      <div className="text-nickname">{nickname}</div>
      <div className="text-entry-time">{entryTime}</div>
      <div className="text-about">{about}</div>
    </SelectBox>
  );
}

export function TextEdit() {
  const { isSelected } = usePassportContext();
  const { setTextEdit } = useSide();

  return (
    <SelectBox
      type="text"
      className="text cursor-pointer"
      data-selected={isSelected("text", 0) ? true : false}
      onClick={setTextEdit}
      aria-label="Выбрать текстовый блок"
      variant="bound_box"
    />
  );
}
