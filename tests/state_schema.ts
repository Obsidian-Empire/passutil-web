import { CardStateDataSchema } from "../src/lib/state";

const sample = {
  nickname: "",
  entry_time: "",
  about: "",
  friends: [null, "friend-1", null],
  selected: {
    banners: [null, null],
    main_badges: [null, null],
    common_badges: [null],
  },
};

const result = CardStateDataSchema.safeParse(sample);

if (!result.success) {
  console.error("CardStateDataSchema validation failed", result.error);
  process.exit(1);
}

console.log("CardStateDataSchema ok", result.data);
