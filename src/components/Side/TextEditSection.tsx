import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";

function normalizeHexColor(value: string) {
  const normalized = value.trim();
  const match = normalized.match(/^#?[0-9a-fA-F]{6}$/);
  if (!match) {
    return "#000000";
  }

  return normalized.startsWith("#") ? normalized : `#${normalized}`;
}

const FONT_GROUPS = [
  {
    label: "Sans",
    items: [
      { label: "System UI", value: "system-ui" },
      { label: "Arial", value: "Arial, sans-serif" },
      { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
      { label: "Segoe UI", value: "Segoe UI, sans-serif" },
      { label: "Roboto", value: "Roboto, sans-serif" },
    ],
  },
  {
    label: "Serif",
    items: [
      { label: "Times New Roman", value: "Times New Roman, serif" },
      { label: "Georgia", value: "Georgia, serif" },
      { label: "Garamond", value: "Garamond, serif" },
      { label: "Palatino", value: "Palatino, serif" },
    ],
  },
  {
    label: "Mono",
    items: [
      { label: "Courier New", value: "Courier New, monospace" },
      { label: "Consolas", value: "Consolas, monospace" },
      { label: "Fira Code", value: "Fira Code, monospace" },
      { label: "Menlo", value: "Menlo, monospace" },
    ],
  },
];

export function TextEditSection() {
  const { isTextEdit } = useSide();
  const { state, updateState } = useCardState();

  if (!isTextEdit) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <div className="text-xs text-muted-foreground">Цвет</div>
        <Popover>
          <PopoverTrigger
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <span className="flex items-center gap-2">
              <span
                className="size-4 rounded-sm border border-border"
                style={{ backgroundColor: state.textColor }}
                aria-hidden="true"
              />
              <span className="text-xs">Цвет текста</span>
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <PopoverHeader>
              <PopoverTitle>Цвет текста</PopoverTitle>
            </PopoverHeader>
            <div className="flex items-center gap-3">
              <Input
                type="color"
                className="h-10 w-12 p-1"
                value={state.textColor}
                onInput={(event) =>
                  updateState({
                    textColor: normalizeHexColor(event.currentTarget.value),
                  })
                }
              />
              <div className="flex flex-col text-xs text-muted-foreground">
                <span>HEX</span>
                <span className="font-mono text-foreground">
                  {state.textColor.toUpperCase()}
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </label>

      <label className="flex flex-col gap-2">
        <div className="text-xs text-muted-foreground">Шрифт</div>
        <Select
          value={state.textFont}
          onValueChange={(value) =>
            updateState({ textFont: value ?? state.textFont })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <span className="flex flex-col">
                      <span>{item.label}</span>
                      <span
                        className="text-xs text-muted-foreground"
                        style={{ fontFamily: item.value }}
                      >
                        вкусные булочки
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Прозвище</span>
          <span>{Math.max(0, 38 - state.nickname.length)}</span>
        </div>
        <Input
          type="text"
          value={state.nickname}
          maxLength={38}
          onInput={(event) =>
            updateState({
              nickname: event.currentTarget.value.slice(0, 38),
            })
          }
        />
      </label>
      <label className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Прибыл</span>
          <span>{Math.max(0, 38 - state.entry_time.length)}</span>
        </div>
        <Input
          type="text"
          value={state.entry_time}
          maxLength={38}
          onInput={(event) =>
            updateState({
              entry_time: event.currentTarget.value.slice(0, 40),
            })
          }
        />
      </label>
      <label className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>О себе</span>
          <span>{Math.max(0, 450 - state.about.length)}</span>
        </div>
        <textarea
          className="min-h-[250px] resize-y rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          rows={6}
          value={state.about}
          maxLength={450}
          onInput={(event) =>
            updateState({
              about: event.currentTarget.value.slice(0, 450),
            })
          }
        />
      </label>
    </div>
  );
}
