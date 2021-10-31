import { useContext } from "react"
import { ColorModeContext } from "../contexts/ColorModeProvider"

export const useColorMode = () => {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within an ColorModeProvider");
  }
  return context;
}