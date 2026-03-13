import { usePassportContext } from "./PassportContext";

export function FrameView() {
  const { frameUrl } = usePassportContext();

  return (
    <div
      className="card_slot card_slot--frame card_slot--display"
      aria-hidden="true"
    >
      {frameUrl ? <img className="card_frame" src={frameUrl} alt="" /> : null}
    </div>
  );
}
