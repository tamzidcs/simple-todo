import { useState, createContext, type ReactNode } from "react";
import type { toast,Severity } from "../../../interfaces/toast";

type ShowToastType = (message: string, severity: Severity) => void;

const ToastContext = createContext<ShowToastType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode
}

export function ToastProvider({children}: ToastProviderProps) {
  const [toasts, setToasts] = useState<toast[]>([]);

  const showToast = (message: string, severity: Severity) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, severity, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id != id));
    }, 3000);
  };
  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-item">
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
