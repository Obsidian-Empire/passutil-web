import { useCardState } from "../../lib/state";
import { useSide } from "../../lib/side";
import { Input } from "../ui/input";

export function TextEditSection() {
  const { isTextEdit } = useSide();
  const { state, updateState } = useCardState();

  if (!isTextEdit) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
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
