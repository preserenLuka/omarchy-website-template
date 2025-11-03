//themes.ts
import type { Theme } from "../types/theme";

export const themes: Theme[] = [
  {
    id: "osaka-jade",
    name: "Osaka Jade",
    colors: {
      bg: "rgba(10, 20, 15, 0.85)", // dark green-black
      bgSecondary: "rgba(20, 35, 30, 0.9)", // slightly lighter jade tint
      text: "#C8FACC", // pale jade for text
      textSecondary: "#8CCF92", // muted soft green
      accent: "#00FF99", // neon jade / terminal green
      border: "#1B3B32", // deep greenish border
    },
    typography: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 600,
      },
      fontSize: {
        base: "16px",
        sm: "14px",
        lg: "18px",
        xl: "24px",
      },
    },
    backgrounds: [
      "/backgrounds/osaka-jade/1-osaka-jade-bg.jpg",
      "/backgrounds/osaka-jade/2-osaka-jade-bg.jpg",
      "/backgrounds/osaka-jade/3-osaka-jade-bg.jpg",
    ],
  },
  {
    id: "nord",
    name: "Nord",
    colors: {
      bg: "rgba(46, 52, 64, 0.9)",
      bgSecondary: "rgba(36, 42, 54, 0.95)",
      text: "#E5E9F0",
      textSecondary: "#D8DEE9",
      accent: "#88C0D0",
      border: "#4C566A",
    },
    typography: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },
      fontSize: {
        base: "15px",
        sm: "13px",
        lg: "17px",
        xl: "22px",
      },
    },
    backgrounds: [
      "/backgrounds/nord/1-nord-bg.png",
      "/backgrounds/nord/2-nord-bg.png",
      "/backgrounds/nord/3-nord-bg.png",
      "/backgrounds/nord/4-nord-bg.png",
      "/backgrounds/nord/5-nord-bg.png",
      "/backgrounds/nord/6-nord-bg.png",
      "/backgrounds/nord/7-nord-bg.png",
      "/backgrounds/nord/8-nord-bg.png",
      "/backgrounds/nord/9-nord-bg.png",
      "/backgrounds/nord/10-nord-bg.png",
      "/backgrounds/nord/11-nord-bg.png",
    ],
  },
  {
    id: "ristretto",
    name: "Ristretto",
    colors: {
      // deep roasted browns + warm orange accents (city + orange moon vibe)
      bg: "rgba(28, 16, 10, 0.90)", // near-black brown
      bgSecondary: "rgba(40, 24, 16, 0.94)", // a touch warmer/lighter
      text: "#F2E6D8", // warm ivory
      textSecondary: "#D1B8A0", // muted latte
      accent: "#E07A3F", // burnt orange (CTA, focus, sliders)
      border: "#3A2415", // dark coffee outline
    },
    typography: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: { normal: 400, medium: 500, bold: 700 },
      fontSize: { base: "15px", sm: "13px", lg: "17px", xl: "22px" },
    },
    backgrounds: [
      "/backgrounds/ristretto/1-ristretto-bg.jpg", // ← your orange city image
      "/backgrounds/ristretto/2-ristretto-bg.jpg",
      "/backgrounds/ristretto/3-ristretto-bg.jpg",
    ],
  },

  {
    id: "matte-black",
    name: "Matte Black",
    colors: {
      bg: "rgba(6, 6, 7, 0.88)",
      bgSecondary: "rgba(14, 14, 16, 0.94)",
      text: "#EAEAEA",
      textSecondary: "#B7B7B7",
      accent: "#98defeff",
      border: "#242426",
    },
    typography: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: { normal: 400, medium: 500, bold: 600 },
      fontSize: { base: "16px", sm: "14px", lg: "18px", xl: "24px" },
    },
    backgrounds: [
      "/backgrounds/matte-black/1-matte-black-bg.jpg",
      "/backgrounds/matte-black/2-matte-black-bg.jpg",
      "/backgrounds/matte-black/3-matte-black-bg.jpg",
      "/backgrounds/matte-black/4-matte-black-bg.jpg",
      "/backgrounds/matte-black/5-matte-black-bg.jpg",
    ],
  },
];
