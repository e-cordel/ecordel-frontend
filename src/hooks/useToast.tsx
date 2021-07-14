import { useContext } from "react";
import { ToastContext, ToastContextData } from "../contexts/ToastProvider";

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context
}