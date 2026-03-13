import { useSide } from "../../lib/side";

export function ExportButton() {
  const { exportCard, isExporting } = useSide();

  return (
    <button
      className="side__clear"
      type="button"
      onClick={async () => {
        await exportCard();
      }}
      disabled={isExporting}
      aria-busy={isExporting}
    >
      {isExporting ? "Экспорт..." : "Экспорт"}
    </button>
  );
}
