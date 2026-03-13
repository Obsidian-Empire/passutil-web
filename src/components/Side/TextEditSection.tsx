import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";

export function TextEditSection() {
  const { isTextEdit } = useSide();
  const { state, updateState } = useCardState();

  if (!isTextEdit) {
    return null;
  }

  return (
    <div className="side__upload">
      <label className="side__select">
        <div className="side__section_item">
          <span className="side__select-label">Прозвище</span>
          <span className="side__counter">
            {Math.max(0, 38 - state.nickname.length)}
          </span>
        </div>
        <input
          className="side__upload-input"
          type="text"
          value={state.nickname}
          maxLength={38}
          onInput={(event) =>
            updateState({
              nickname: event.currentTarget.value.slice(0, 38),
            })
          }
        />
      </label>
      <label className="side__select">
        <div className="side__section_item">
          <span className="side__select-label">Прибыл</span>
          <span className="side__counter">
            {Math.max(0, 38 - state.entry_time.length)}
          </span>
        </div>
        <input
          className="side__upload-input"
          type="text"
          value={state.entry_time}
          maxLength={38}
          onInput={(event) =>
            updateState({
              entry_time: event.currentTarget.value.slice(0, 40),
            })
          }
        />
      </label>
      <label className="side__select">
        <div className="side__section_item">
          <span className="side__select-label">О себе</span>
          <span className="side__counter">
            {Math.max(0, 450 - state.about.length)}
          </span>
        </div>
        <textarea
          className="side__upload-input side__textarea"
          rows={6}
          value={state.about}
          maxLength={450}
          onInput={(event) =>
            updateState({
              about: event.currentTarget.value.slice(0, 450),
            })
          }
        />
      </label>
    </div>
  );
}
