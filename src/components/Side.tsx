import { CategoriesSection } from "./Side/CategoriesSection";
import { SelectedSlotSection } from "./Side/SelectedSlotSection";
import { VariantsSection } from "./Side/VariantsSection";

export function Side() {
  return (
    <div className="flex h-full min-h-0 flex-col border-l p-6 gap-6 bg-background z-10">
      <div className="flex flex-col gap-6 shrink-0">
        <SelectedSlotSection />
        <CategoriesSection />
      </div>
      <VariantsSection />
    </div>
  );
}
