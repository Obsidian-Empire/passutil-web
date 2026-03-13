import { useSide } from "../../lib/side";
import { AvatarUploadSection } from "./AvatarUploadSection";
import { BackgroundGroupSection } from "./BackgroundGroupSection";
import { ExportButton } from "./ExportButton";
import { FriendUploadSection } from "./FriendUploadSection";
import { TextEditSection } from "./TextEditSection";

export function SelectedSlotSection() {
  const { activeSlot, handleClearSlot } = useSide();

  return (
    <div className="side__section">
      <div className="side__title">Выбранный слот</div>
      {activeSlot ? (
        <div className="side__slot">
          <span className="side__slot-kind">{activeSlot.kind}</span>
          <span className="side__slot-index">#{activeSlot.index + 1}</span>
        </div>
      ) : (
        <div className="side__slot side__slot--empty">Слот не выбран</div>
      )}
      {activeSlot ? (
        <button
          className="side__clear"
          type="button"
          onClick={() => handleClearSlot(activeSlot)}
        >
          Очистить слот
        </button>
      ) : null}
      <AvatarUploadSection />
      <FriendUploadSection />
      <TextEditSection />
      <ExportButton />
      <BackgroundGroupSection />
    </div>
  );
}
