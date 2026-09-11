import { useWindowDimensions } from "react-native"

const DESKTOP_BREAKPOINT = 900

export function useResponsive() {
  const { width } = useWindowDimensions()
  return {
    isWide: width >= DESKTOP_BREAKPOINT,
    width,
  }
}