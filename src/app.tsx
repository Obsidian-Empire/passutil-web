import Passport from "./components/Passport";
import { Side } from "./components/Side";

export function App() {
  return (
    <div className="grid grid-cols-[70%_30%] h-svh">
      <Passport />
      <Side />
    </div>
  );
}
