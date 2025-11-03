//theme context.tsx

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Theme } from "../types/theme";
import { themes } from "../data/themes";

type ThemeContextType = {
  currentTheme: Theme;
  currentBackgroundIndex: number;
  setTheme: (themeId: string) => void;
  setBackgroundIndex: (index: number) => void;
  nextBackground: () => void;
  prevBackground: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const savedThemeId = localStorage.getItem("themeId");
    const savedBgIndex = localStorage.getItem("backgroundIndex");

    if (savedThemeId) {
      const theme = themes.find((t) => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);

        if (savedBgIndex) {
          const index = parseInt(savedBgIndex);
          if (index >= 0 && index < theme.backgrounds.length) {
            setCurrentBackgroundIndex(index);
          }
        }
      }
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;

    // Colors
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Typography
    root.style.setProperty("--font-family", currentTheme.typography.fontFamily);
    root.style.setProperty(
      "--font-weight-normal",
      currentTheme.typography.fontWeight.normal.toString()
    );
    root.style.setProperty(
      "--font-weight-medium",
      currentTheme.typography.fontWeight.medium.toString()
    );
    root.style.setProperty(
      "--font-weight-bold",
      currentTheme.typography.fontWeight.bold.toString()
    );
    root.style.setProperty(
      "--font-size-base",
      currentTheme.typography.fontSize.base
    );
    root.style.setProperty(
      "--font-size-sm",
      currentTheme.typography.fontSize.sm
    );
    root.style.setProperty(
      "--font-size-lg",
      currentTheme.typography.fontSize.lg
    );
    root.style.setProperty(
      "--font-size-xl",
      currentTheme.typography.fontSize.xl
    );

    // Background image
    const bgImage = currentTheme.backgrounds[currentBackgroundIndex];
    root.style.backgroundImage = `url(${bgImage})`;
    root.style.backgroundSize = "cover";
    root.style.backgroundPosition = "center";
    root.style.backgroundAttachment = "fixed";
  }, [currentTheme, currentBackgroundIndex]);

  const setTheme = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      setCurrentBackgroundIndex(0); // Reset to first background when switching themes
      localStorage.setItem("themeId", themeId);
      localStorage.setItem("backgroundIndex", "0");
    }
  };

  const setBackgroundIndex = (index: number) => {
    if (index >= 0 && index < currentTheme.backgrounds.length) {
      setCurrentBackgroundIndex(index);
      localStorage.setItem("backgroundIndex", index.toString());
    }
  };

  const nextBackground = () => {
    const newIndex =
      (currentBackgroundIndex + 1) % currentTheme.backgrounds.length;
    setBackgroundIndex(newIndex);
  };

  const prevBackground = () => {
    const newIndex =
      currentBackgroundIndex === 0
        ? currentTheme.backgrounds.length - 1
        : currentBackgroundIndex - 1;
    setBackgroundIndex(newIndex);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentBackgroundIndex,
        setTheme,
        setBackgroundIndex,
        nextBackground,
        prevBackground,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
