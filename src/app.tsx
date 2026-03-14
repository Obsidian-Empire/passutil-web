import Passport from "./components/Passport";
import { Side } from "./components/Side";

export function App() {
  return (
    <div className="grid grid-rows-[30%_70%] md:grid-rows-1 md:grid-cols-[70%_30%] md:h-svh">
      <Passport />
      <Side />
    </div>
  );
}
