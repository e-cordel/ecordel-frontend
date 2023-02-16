import { Alert, Snackbar } from "@mui/material";
import { createContext, ReactNode, useCallback, useState } from "react";

export interface ToastMessage {
  type?: "success" | "error";
  message?: string;
}

export interface ToastContextData {
  addToast(message: ToastMessage): void;
}

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [message, setMessage] = useState<ToastMessage>();
  const [show, setShow] = useState(false);

  const addToast = useCallback((toastMessage: ToastMessage) => {
    const toast = {
      type: toastMessage.type,
      message: toastMessage.message,
    };
    setMessage(toast);
    setShow(true);
  }, []);

  function handleShow() {
    setShow(false);
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleShow}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleShow}
          severity={message?.type}
          sx={{ width: "100%" }}
        >
          {message?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
