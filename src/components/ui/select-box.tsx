import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "preact/compat";

const selectBoxVariants = cva("border-dashed border-primary inline-flex", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function SelectBox({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof selectBoxVariants>) {
  return (
    <div className={cn(selectBoxVariants({ variant, className }))} {...props}>
      {children}
    </div>
  );
}

export { SelectBox, selectBoxVariants };
