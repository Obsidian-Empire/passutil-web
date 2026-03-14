import { useSide } from "../../lib/side";
import { Button } from "../ui/button";

export function ExportButton() {
  const { exportCard, isExporting } = useSide();

  return (
    <Button
      onClick={async () => {
        await exportCard();
      }}
      disabled={isExporting}
      aria-busy={isExporting}
    >
      {isExporting ? "Экспорт..." : "Экспорт"}
    </Button>
  );
}
