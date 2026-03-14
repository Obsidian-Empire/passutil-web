import { usePassportContext } from "./PassportContext";
import { SelectBox } from "../ui/select-box";

export function BackgroundView() {
  const { backgroundUrl } = usePassportContext();

  return (
    <SelectBox type="background" aria-hidden="true">
      {backgroundUrl ? <img src={backgroundUrl} alt="" /> : null}
    </SelectBox>
  );
}

export function BackgroundEdit() {
  const { isSelected, selectSlot } = usePassportContext();

  return (
    <SelectBox
      type="background"
      variant="bound_box"
      data-selected={isSelected("background", 0) ? true : false}
      onClick={() => selectSlot("background", 0)}
      aria-label="Выбрать фон"
    />
  );
}
