import { generateCardWebpUrl } from "./generate";

export async function exportCardWebp(options?: {
  onStart?: () => void;
  onFinish?: () => void;
}): Promise<void> {
  options?.onStart?.();
  try {
    await generateCardWebpUrl();
  } finally {
    options?.onFinish?.();
  }
}
