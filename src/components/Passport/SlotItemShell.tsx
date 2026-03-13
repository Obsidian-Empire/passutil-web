import type { ComponentChildren } from "preact";

type SlotItemShellProps = {
  slotClassName: string;
  children?: ComponentChildren;
};

type SlotEditItemShellProps = SlotItemShellProps & {
  isSelected: boolean;
  onClick: () => void;
  ariaLabel: string;
};

function buildSlotClassName(base: string, slotClassName: string) {
  return `${base} ${slotClassName}`;
}

export function SlotViewItemShell({
  slotClassName,
  children,
}: SlotItemShellProps) {
  return (
    <div
      className={buildSlotClassName(
        "card_slot card_slot--display",
        slotClassName,
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function SlotEditItemShell({
  slotClassName,
  children,
  isSelected,
  onClick,
  ariaLabel,
}: SlotEditItemShellProps) {
  return (
    <button
      className={`${buildSlotClassName("card_slot", slotClassName)}${
        isSelected ? " is-selected" : ""
      }`}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
