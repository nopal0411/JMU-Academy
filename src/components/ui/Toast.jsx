// src/components/ui/Toast.jsx
import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

function Toast({ id, message, type = 'success', onRemove }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-white border-l-4 border-green-500',
    error: 'bg-white border-l-4 border-red-500',
    info: 'bg-white border-l-4 border-blue-500',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg shadow-modal min-w-[280px] max-w-sm animate-slide-up ${bgStyles[type]}`}
      role="alert"
    >
      {icons[type]}
      <p className="text-sm text-neutral-700 flex-1 leading-relaxed">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="text-neutral-400 hover:text-neutral-600 transition-colors ml-1 flex-shrink-0"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onRemove }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default Toast;
