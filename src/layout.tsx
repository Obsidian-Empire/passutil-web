import type { ReactNode } from "preact/compat";
import { StateProvider } from "./lib/state";
import { SideProvider } from "./lib/side";
import { ViewportProvider } from "./lib/viewport";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <StateProvider>
      <SideProvider>
        <ViewportProvider>{children}</ViewportProvider>
      </SideProvider>
    </StateProvider>
  );
}
