import { useSide } from "../../lib/side";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    <div className="flex flex-col gap-3 h-fit">
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Категории
      </div>
      {!activeSlot ? (
        <div className="text-xs text-muted-foreground">
          Сначала выбери слот на паспорте.
        </div>
      ) : blobStatus === "loading" ? (
        <div className="text-xs text-muted-foreground">
          Загрузка вариантов...
        </div>
      ) : blobStatus === "error" ? (
        <div className="text-xs text-destructive" role="status">
          {blobError ?? "Ошибка загрузки"}
        </div>
      ) : categories.length ? (
        <div className="flex flex-col gap-2">
          <Select
            value={resolvedCategory?.type ?? ""}
            onValueChange={(value) => setActiveCategory(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.type} value={category.type}>
                  {category.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground">
          Нет доступных категорий для слота.
        </div>
      )}
    </div>
  );
}
