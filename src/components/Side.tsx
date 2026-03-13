import "./Side.css";
import { CategoriesSection } from "./Side/CategoriesSection";
import { SelectedSlotSection } from "./Side/SelectedSlotSection";
import { VariantsSection } from "./Side/VariantsSection";

export function Side() {
  return (
    <aside className="side">
      <SelectedSlotSection />
      <CategoriesSection />
      <VariantsSection />
    </aside>
  );
}
