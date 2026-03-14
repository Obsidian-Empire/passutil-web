import { usePassportContext } from "./PassportContext";
import { useSide } from "../../lib/side";
import { SelectBox } from "../ui/select-box";

export function TextView() {
  const { nickname, entryTime, about } = usePassportContext();

  return (
    <SelectBox
      type="text"
      aria-hidden="true"
      className="text-black text-[20px]"
    >
      <div className="absolute left-[133px] top-0">{nickname}</div>
      <div className="absolute left-[133px] top-[35px]">{entryTime}</div>
      <div className="absolute left-0 top-[68px]  indent-[133px]  leading-[40px] whitespace-pre-wrap wrap-anywhere">
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
