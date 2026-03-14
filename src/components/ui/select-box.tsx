import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "preact/compat";

const selectBoxVariants = cva(
  "outline-primary hover:outline hover:outline-1 data-[selected=true]:outline data-[selected=true]:outline-2 data-[selected=true]:outline-primary hover:data-[selected=true]:outline-dashed [.is-exporting-card_&]:outline-none",
  {
    variants: {
      variant: {
        default: "pointer-events-none",
        edit: "z-2 cursor-pointer hover:outline-dashed",
        bound_box: "outline-1 outline-solid",
      },
      type: {
        default: "",
        background: "absolute top-0 left-0 h-[900px] w-[1600px]",
        frame: "absolute top-0 left-0 h-[900px] w-[1600px]",
        avatar: "absolute top-[31px] left-[341px] h-[340px] w-[340px]",
        text: "absolute top-[420px] left-[40px] h-[450px] w-[627px] after:opacity-100",
        friend_item: "h-full w-full",
        friend:
          "absolute top-[24px] left-[1018px] grid h-[148px] w-[557px] grid-cols-[repeat(7,72px)] grid-rows-[repeat(2,70px)] gap-[8px]",
        banner: "h-[306px] w-[140px]",
        banners:
          "absolute top-[0px] left-[710px] grid h-[306px] w-[290px] grid-cols-[repeat(2,140px)] gap-[10px]",
        "main-badge": "h-[263px] w-[263px]",
        "main-badges":
          "grid-rows-auto absolute top-[337px] left-[724px] grid h-[543px] w-[263px] gap-[17px]",
        "common-badge": "h-[124px] w-[124px]",
        "common-badges":
          "grid-rows-auto absolute top-[196px] left-[1015px] grid h-[684px] w-[559px] grid-cols-[repeat(4,124px)] gap-x-[21px] gap-y-[16px]",
        //
      },
    },
    defaultVariants: {
      variant: "default",
      type: "default",
    },
  },
);

function SelectBox({
  className,
  variant = "default",
  type = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof selectBoxVariants>) {
  return (
    <div
      className={cn(selectBoxVariants({ variant, type, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

export type SelectBoxType = NonNullable<
  VariantProps<typeof selectBoxVariants>["type"]
>;

export { SelectBox, selectBoxVariants };
