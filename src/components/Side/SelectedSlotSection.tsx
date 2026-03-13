import { useSide } from "../../lib/side";
import { AvatarUploadSection } from "./AvatarUploadSection";
import { BackgroundGroupSection } from "./BackgroundGroupSection";
import { ExportButton } from "./ExportButton";
import { FriendUploadSection } from "./FriendUploadSection";
import { TextEditSection } from "./TextEditSection";

export function SelectedSlotSection() {
  const { activeSlot, handleClearSlot } = useSide();

  const slotLabels: Record<string, string> = {
    background: "Фон",
    frame: "Рамка",
    avatar: "Аватар",
    friend: "Друг",
    banner: "Баннер",
    main_badge: "Основной значок",
    common_badge: "Значок",
    text: "Текст",
  };

  return (
    <div className="side__section">
      <div className="side__hero">
        <div className="side__hero-head">
          <div>
            <h1 className="side__hero-title">Passutil</h1>
            <p className="side__hero-subtitle">Собери свой паспорт за минуту</p>
          </div>
          <div className="side__hero-links">
            <a
              data-label="Код"
              href="https://github.com/Obsidian-Empire/passutil-web"
              className="side__icon-link"
              aria-label="GitHub проекта"
            >
              <img className="button-icon" src="gh.svg" alt="GitHub" />
            </a>
            <a
              data-label="ассеты"
              href="https://github.com/Obsidian-Empire/passutil_assets/tree/compressed"
              className="side__icon-link"
              aria-label="GitHub ассетов"
            >
              <img className="button-icon" src="gh.svg" alt="GitHub" />
            </a>
          </div>
        </div>
        <div className="side__hero-footer">
          <span className="side__hero-caption">Автор:</span>
          <a
            href="https://github.com/TOwInOK"
            className="side__hero-author"
            aria-label="GitHub автора"
          >
            TOwInOK
          </a>
          <span>& codex</span>
        </div>
      </div>

      <div className="side__title">Выбранный слот</div>
      {activeSlot ? (
        <div className="side__slot">
          <span className="side__slot-kind">
            {slotLabels[activeSlot.kind] ?? activeSlot.kind}
          </span>
          <span className="side__slot-index">#{activeSlot.index + 1}</span>
        </div>
      ) : (
        <div className="side__slot side__slot--empty">Слот не выбран</div>
      )}
      <div className="side__section_item">
        {activeSlot ? (
          <button
            className="side__clear side__clear--danger"
            type="button"
            onClick={() => handleClearSlot(activeSlot)}
          >
            Очистить слот
          </button>
        ) : null}
        <ExportButton />
      </div>

      <AvatarUploadSection />
      <FriendUploadSection />
      <TextEditSection />

      <BackgroundGroupSection />
    </div>
  );
}
