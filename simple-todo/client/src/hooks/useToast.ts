import { useContext } from "react"
import { ToastContext } from "../components/views/ToastProvider/ToastProvider"
import type { ShowToastType } from "../components/views/ToastProvider/ToastProvider"

export const useToast = (): ShowToastType => {
    const context = useContext(ToastContext);
    if(!context){
        throw new Error("useToast must be used within a toast provider");
    }
    return context;
};