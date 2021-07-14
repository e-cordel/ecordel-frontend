import { Snackbar } from '@material-ui/core';
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export interface ToastMessage {
  type?: 'success' | 'error';
  message?: string;
}

export interface ToastContextData {
  addToast(message: ToastMessage): void;
}

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider = ({ children }: ToastProviderProps) => {

  const [message, setMessage] = useState<ToastMessage>();
  const [show, setShow] = useState(false)

  const addToast = useCallback((toastMessage: ToastMessage) => {

    const toast = {
      type: toastMessage.type,
      message: toastMessage.message
    }
    setMessage(toast);
    setShow(true);
  }, []);

  function handleShow() {
    setShow(!show)
  }

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Snackbar open={show} autoHideDuration={6000} onClose={handleShow}>
        <Alert onClose={handleShow} severity={message?.type}>
          {message?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )

}