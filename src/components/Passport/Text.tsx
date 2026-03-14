import { usePassportContext } from "./PassportContext";
import { useSide } from "../../lib/side";
import { SelectBox } from "../ui/select-box";

export function TextView() {
  const { nickname, entryTime, about } = usePassportContext();

  return (
    <SelectBox
      type="text"
      aria-hidden="true"
      className="text-[20px] text-black"
    >
      <div className="absolute top-0 left-[133px]">{nickname}</div>
      <div className="absolute top-[35px] left-[133px]">{entryTime}</div>
      <div className="absolute top-[68px] left-0 indent-[133px] leading-[40px] wrap-anywhere whitespace-pre-wrap">
        {about}
      </div>
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
