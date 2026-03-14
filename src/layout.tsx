import type { ReactNode } from "preact/compat";
import { StateProvider } from "./lib/state";
import { SideProvider } from "./lib/side";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StateProvider>
      <SideProvider>{children}</SideProvider>
    </StateProvider>
  );
}
