import Passport from "./components/Passport";
import { Side } from "./components/Side";

export function App() {
  return (
    <div className="grid grid-cols-[3fr_1fr] h-svh">
      <Passport />
      <Side />
    </div>
  );
}
