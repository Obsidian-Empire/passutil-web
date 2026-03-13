import { usePassportContext } from "./PassportContext";

export function BackgroundView() {
  const { backgroundUrl } = usePassportContext();

  return (
    <div
      className="card_slot card_slot--background card_slot--display"
      aria-hidden="true"
    >
      {backgroundUrl ? (
        <img className="card_img" src={backgroundUrl} alt="" />
      ) : null}
    </div>
  );
}

export function BackgroundEdit() {
  const { backgroundUrl, isSelected, selectSlot } = usePassportContext();

  return (
    <button
      className={`card_slot card_slot--background${
        isSelected("background", 0) ? " is-selected" : ""
      }`}
      type="button"
      onClick={() => selectSlot("background", 0)}
      aria-label="Выбрать фон"
    >
      {backgroundUrl ? (
        <img className="card_img card_img--ghost" src={backgroundUrl} alt="" />
      ) : null}
    </button>
  );
}
