import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

const THEME_STORAGE_KEY = "passutil-theme";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const shouldUseDark =
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const handleToggleTheme = () => {
    setIsDark((current) => {
      const nextValue = !current;
      document.documentElement.classList.toggle("dark", nextValue);
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        nextValue ? "dark" : "light",
      );
      return nextValue;
    });
  };

  return (
    <Button
      aria-label="Переключить тему"
      onClick={handleToggleTheme}
      size="icon"
      variant="outline"
      className="p-1"
      render={
        isDark ? (
          <SunIcon aria-hidden="true" />
        ) : (
          <MoonIcon aria-hidden="true" />
        )
      }
    />
  );
}

export { ThemeToggle };
