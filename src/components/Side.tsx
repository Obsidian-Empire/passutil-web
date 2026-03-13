import { useCardState } from "../lib/state";
import { useSide } from "../lib/side";
import "./Side.css";

export function Side() {
  const {
    setUserAvatar,
    setFriendImage,
    clearFriendImage,
    updateState,
    state,
  } = useCardState();
  const {
    activeSlot,
    setActiveSlot,
    blobStatus,
    blobError,
    applyBlobItemToSlot,
    isBackgroundGroup,
    setActiveCategory,
    isTextEdit,
    avatarError,
    setAvatarError,
    friendError,
    setFriendError,
    isExporting,
    exportCard,
    resolvedCategory,
    categories,
    handleClearSlot,
  } = useSide();

  return (
    <aside className="side">
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
        {activeSlot?.kind === "avatar" ? (
          <label className="side__upload">
            <span className="side__upload-title">Upload user</span>
            <input
              className="side__upload-input"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={async (event) => {
                const input = event.currentTarget;
                const file = input.files?.[0];
                if (!file) {
                  return;
                }

                try {
                  setAvatarError(null);
                  await setUserAvatar(file);
                } catch (error) {
                  setAvatarError(
                    error instanceof Error
                      ? error.message
                      : "Ошибка загрузки аватара",
                  );
                } finally {
                  input.value = "";
                }
              }}
            />
            {avatarError ? (
              <span className="side__hint side__hint--error">
                {avatarError}
              </span>
            ) : null}
          </label>
        ) : null}
        {activeSlot?.kind === "friend" ? (
          <div className="side__upload">
            <span className="side__upload-title">Friend</span>
            <label className="side__select">
              <span className="side__select-label">Имя</span>
            </label>
            <label className="side__select">
              <span className="side__select-label">Изображение</span>
              <input
                className="side__upload-input"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={async (event) => {
                  const input = event.currentTarget;
                  const file = input.files?.[0];
                  if (!file) {
                    return;
                  }

                  try {
                    setFriendError(null);
                    await setFriendImage(activeSlot.index, file);
                  } catch (error) {
                    setFriendError(
                      error instanceof Error
                        ? error.message
                        : "Ошибка загрузки друга",
                    );
                  } finally {
                    input.value = "";
                  }
                }}
              />
            </label>
            <button
              className="side__clear"
              type="button"
              onClick={() => clearFriendImage(activeSlot.index)}
            >
              Удалить изображение
            </button>
            {friendError ? (
              <span className="side__hint side__hint--error">
                {friendError}
              </span>
            ) : null}
          </div>
        ) : null}
        {isTextEdit ? (
          <div className="side__upload">
            <span className="side__upload-title">Текст</span>
            <label className="side__select">
              <span className="side__select-label">Прозвище</span>
              <span className="side__counter">
                {Math.max(0, 38 - state.nickname.length)}
              </span>
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
              <span className="side__select-label">Прибыл</span>
              <span className="side__counter">
                {Math.max(0, 38 - state.entry_time.length)}
              </span>
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
              <span className="side__select-label">О себе</span>
              <span className="side__counter">
                {Math.max(0, 450 - state.about.length)}
              </span>
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
        ) : null}
        <button
          className="side__clear"
          type="button"
          onClick={async () => {
            await exportCard();
          }}
          disabled={isExporting}
        >
          {isExporting ? "Экспорт..." : "Экспорт"}
        </button>
        {isBackgroundGroup ? (
          <div className="side__group">
            <div className="side__group-title">Связанные слоты</div>
            <div className="side__group-actions">
              <button
                className={`side__group-button${activeSlot?.kind === "background" ? " is-active" : ""}`}
                type="button"
                onClick={() => setActiveSlot({ kind: "background", index: 0 })}
              >
                Background
              </button>
              <button
                className={`side__group-button${activeSlot?.kind === "frame" ? " is-active" : ""}`}
                type="button"
                onClick={() => setActiveSlot({ kind: "frame", index: 0 })}
              >
                Frame
              </button>
            </div>
          </div>
        ) : null}
      </div>
      {activeSlot?.kind !== "avatar" &&
      activeSlot?.kind !== "friend" &&
      !isTextEdit ? (
        <div className="side__section">
          <div className="side__title">Категории</div>
          {!activeSlot ? (
            <div className="side__hint">Сначала выбери слот на паспорте.</div>
          ) : blobStatus === "loading" ? (
            <div className="side__hint">Загрузка ассетов...</div>
          ) : blobStatus === "error" ? (
            <div className="side__hint side__hint--error">
              {blobError ?? "Ошибка загрузки"}
            </div>
          ) : categories.length ? (
            <label className="side__select">
              <span className="side__select-label">Тип</span>
              <select
                value={resolvedCategory?.type ?? ""}
                onChange={(event) =>
                  setActiveCategory(event.currentTarget.value)
                }
              >
                {categories.map((category) => (
                  <option key={category.type} value={category.type}>
                    {category.type}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div className="side__hint">Нет доступных категорий.</div>
          )}
        </div>
      ) : null}
      {activeSlot?.kind !== "avatar" &&
      activeSlot?.kind !== "friend" &&
      !isTextEdit ? (
        <div className="side__section">
          <div className="side__title">Варианты</div>
          {!activeSlot ? (
            <div className="side__hint">
              Выбери слот, чтобы увидеть варианты.
            </div>
          ) : resolvedCategory ? (
            <div className="side__grid">
              {resolvedCategory.part.map((asset, index) => (
                <button
                  key={`${resolvedCategory.type}-${asset.name}-${index}`}
                  className="side__preview"
                  type="button"
                  onClick={() =>
                    applyBlobItemToSlot(activeSlot, {
                      type: resolvedCategory.type,
                      part: asset,
                    })
                  }
                  title={asset.name}
                >
                  <img src={asset.url} alt={asset.name} />
                </button>
              ))}
            </div>
          ) : (
            <div className="side__hint">
              Нет вариантов для выбранной категории.
            </div>
          )}
        </div>
      ) : null}
    </aside>
  );
}
