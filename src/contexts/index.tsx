import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { ColorModeProvider } from "./ColorModeProvider";
import { ToastProvider } from "./ToastProvider";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ColorModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ToastProvider>{children}</ToastProvider>
        </BrowserRouter>
      </AuthProvider>
    </ColorModeProvider>
  );
}
