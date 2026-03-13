import { useSide } from "../../lib/side";

export function CategoriesSection() {
  const {
    activeSlot,
    isTextEdit,
    blobStatus,
    blobError,
    categories,
    resolvedCategory,
    setActiveCategory,
  } = useSide();

  if (
    activeSlot?.kind === "avatar" ||
    activeSlot?.kind === "friend" ||
    isTextEdit
  ) {
    return null;
  }

  return (
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
            onChange={(event) => setActiveCategory(event.currentTarget.value)}
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
  );
}
