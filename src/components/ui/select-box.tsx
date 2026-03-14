import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "preact/compat";

const selectBoxVariants = cva(
  "outline-primary data-[selected=true]:outline-primary hover:outline hover:outline-1 data-[selected=true]:outline data-[selected=true]:outline-2 hover:data-[selected=true]:outline-dashed [.is-exporting-card_&]:outline-none",
  {
    variants: {
      variant: {
        default: "pointer-events-none",
        edit: "z-2 cursor-pointer hover:outline-dashed ",
        bound_box: "outline-1 outline-solid",
      },
      type: {
        default: "",
        background: "absolute left-0 top-0 h-[900px] w-[1600px]",
        frame: "absolute left-0 top-0 h-[900px] w-[1600px]",
        avatar: "absolute left-[341px] top-[31px] h-[340px] w-[340px]",
        text: " absolute left-[40px] top-[420px] h-[450px] w-[627px] after:opacity-100",
        friend_item: "h-full w-full",
        friend:
          "absolute left-[1018px] top-[24px] h-[148px] w-[557px] grid grid-cols-[repeat(7,72px)] grid-rows-[repeat(2,70px)] gap-[8px]",
        banner: "h-[306px] w-[140px]",
        banners:
          "absolute top-[0px] left-[710px] h-[306px] w-[290px] grid gap-[10px] grid-cols-[repeat(2,140px)]",
        "main-badge": "h-[263px] w-[263px]",
        "main-badges":
          "absolute grid gap-[17px] grid-rows-auto top-[337px] left-[724px] h-[543px] w-[263px]",
        "common-badge": " h-[124px] w-[124px]",
        "common-badges":
          " absolute grid gap-y-[21px] gap-x-[16px] grid-rows-auto grid-cols-[repeat(4,124px)] top-[196px] left-[1015px] h-[684px] w-[559px]",
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
