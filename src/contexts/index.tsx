import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ToastProvider } from "./ToastProvider";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </AuthProvider>
  )
}
