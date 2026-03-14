import type { ComponentChildren } from "preact";
import { SelectBox } from "../ui/select-box";

type SlotItemShellProps = {
  slotClassName: string;
  children?: ComponentChildren;
};

type SlotEditItemShellProps = SlotItemShellProps & {
  isSelected: boolean;
  onClick: () => void;
  ariaLabel: string;
};

export function SlotViewItemShell({ children }: SlotItemShellProps) {
  return (
    <SelectBox className="cursor-pointer" aria-hidden="true">
      {children}
    </SelectBox>
  );
}

export function SlotEditItemShell({
  children,
  isSelected,
  onClick,
  ariaLabel,
}: SlotEditItemShellProps) {
  return (
    <SelectBox
      className="cursor-pointer"
      data-selected={isSelected ? true : false}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </SelectBox>
  );
}
