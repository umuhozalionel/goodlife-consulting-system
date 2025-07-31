// src/theme/colors.ts
const customColors = {
  charcoal: "#212121",

  // Your main tokens
  primary:  "#4ade80",
  secondary:"#f59e0b",
  accent:   "#10b981",

  // Any other bespoke shades
  terracotta: {
    50:  "#fdf4f0",
    100: "#fbe6d9",
    200: "#f6cab3",
    300: "#f0a583",
    400: "#e87851",
    500: "#d2691e",
    600: "#b85a1a",
    700: "#9a4a16",
    800: "#7d3d17",
    900: "#663315",
  },
  forest: {
    50:  "#f0f9f0",
    100: "#dcf2dc",
    200: "#bce5bc",
    300: "#8dd18d",
    400: "#56b556",
    500: "#228b22",
    600: "#1e7a1e",
    700: "#1a651a",
    800: "#185118",
    900: "#164316",
  },
} as const

export default customColors
