import { usePassportContext } from "./PassportContext";
import { SelectBox } from "../ui/select-box";

export function FrameView() {
  const { frameUrl } = usePassportContext();

  return (
    <SelectBox type="frame" aria-hidden="true" className="pointer-events-none">
      {frameUrl ? <img className="card_frame" src={frameUrl} alt="" /> : null}
    </SelectBox>
  );
}
