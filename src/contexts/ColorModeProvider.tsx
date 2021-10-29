import {
  createContext,
  ReactChild,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ModeTypes } from "../theme";

export interface ColorModeData {
  mode: ModeTypes;
  toggleColorMode(): void;
}

export const ColorModeContext = createContext<ColorModeData>(
  {} as ColorModeData
);

export const ColorModeProvider = ({ children }: { children: ReactChild }) => {
  const [mode, setMode] = useState<ModeTypes>("light");

  useEffect(() => {
    const colorMode: ModeTypes | null = window.localStorage.getItem(
      "@ECordel:colorMode"
    ) as ModeTypes | null;
    if (colorMode) {
      setMode(colorMode);
    } else {
      setMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, []);

  const toggleColorMode = useCallback(() => {
    let colorMode: ModeTypes = "light";
    if (mode === "light") {
      colorMode = "dark";
    }
    setMode(colorMode);
    window.localStorage.setItem("@ECordel:colorMode", colorMode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
