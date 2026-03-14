import { CategoriesSection } from "./Side/CategoriesSection";
import { SelectedSlotSection } from "./Side/SelectedSlotSection";
import { VariantsSection } from "./Side/VariantsSection";

export function Side() {
  return (
    <div className="z-10 flex h-full min-h-0 flex-col gap-6 border-l bg-background p-6">
      <div className="flex shrink-0 flex-col gap-6">
        <SelectedSlotSection />
        <CategoriesSection />
      </div>
      <VariantsSection />
    </div>
  );
}
