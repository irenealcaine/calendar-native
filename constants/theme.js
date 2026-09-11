export const colors = {
  background: "#0E0E12",
  surface: "#1A1B21",
  surfaceAlt: "#22232B",
  border: "#2A2C34",
  textPrimary: "#ECEDF0",
  textSecondary: "#9A9DA6",
  accent: "#7C8CF8",
  accentText: "#FFFFFF",
  danger: "#F0646C",
  muted: "#3A3D46",
  cell: "#15161B",
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
}

export const typography = {
  title: { fontSize: 18, fontWeight: "700" },
  body: { fontSize: 15, fontWeight: "400" },
  meta: { fontSize: 13, fontWeight: "400" },
}

export function withAlpha(hex, alpha) {
  const value = hex.replace("#", "")
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const eventPalette = [
  "#F0646C",
  "#F9A03F",
  "#F7D154",
  "#6BCB77",
  "#4FAAF0",
  "#7C8CF8",
  "#B083F0",
  "#F08CC1",
  "#E84B7A",
  "#FF8A5C",
  "#FFD166",
  "#06D6A0",
  "#2EC4B6",
  "#5A67F2",
  "#9D4EDD",
  "#D7263D",
  "#4F772D",
  "#8D6E63",
]