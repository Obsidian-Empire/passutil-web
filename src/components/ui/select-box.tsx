import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "preact/compat";

const selectBoxVariants = cva("border-primary inline-flex", {
  variants: {
    variant: {
      default:
        "hover:border-2 data-[selected=true]:border-primary data-[selected=true]:border-2 hover:border-dashed",
      outline: "border-2 border-dashed",
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
