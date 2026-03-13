import "./app.css";
import Passport from "./components/Passport";
import { Side } from "./components/Side";

export function App() {
  return (
    <div class="app">
      <Passport />
      <Side />
      <div class="app-note">
        <div class="app-note__item">
          <kbd class="app-note__kbd">CTRL</kbd>
          <span class="app-note__plus">+</span>
          <img
            class="app-note__mouse"
            src="/src/assets/mouse-scroll.svg"
            alt="mouse scroll"
          />
          <span class="app-note__desc">приближение</span>
        </div>
        <div class="app-note__item">
          <kbd class="app-note__kbd">SHIFT</kbd>
          <span class="app-note__plus">+</span>
          <img
            class="app-note__mouse"
            src="/src/assets/mouse-scroll.svg"
            alt="mouse scroll"
          />
          <span class="app-note__desc">горизонтальный скролл</span>
        </div>
        <div class="app-note__item">
          <img
            class="app-note__mouse"
            src="/src/assets/mouse-scroll.svg"
            alt="mouse scroll"
          />
          <span class="app-note__desc">вертикальный скролл</span>
        </div>
      </div>
    </div>
  );
}
