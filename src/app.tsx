import Passport from "./components/Passport";
import { Side } from "./components/Side";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/ui/resizable";
import { useMobile } from "./lib/use-mobile";

export function App() {
  const isMobile = useMobile();

  return (
    <>
      {isMobile ? (
        <div className="grid grid-rows-[30%_70%] md:h-svh md:grid-cols-[70%_30%] md:grid-rows-1">
          <Passport />
          <Side />
        </div>
      ) : (
        <ResizablePanelGroup
          orientation="horizontal"
          className="max-h-svh min-h-svh w-full min-w-svh rounded-lg border"
        >
          <ResizablePanel defaultSize="70%">
            <Passport />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="30%" minSize="20%">
            <Side />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </>
  );
}
