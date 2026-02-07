import type { ReactNode } from 'react';
import Button from './Button.tsx';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger';
}

export default function Modal({ open, onClose, title, children, onConfirm, confirmLabel = 'OK', confirmVariant = 'primary' }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 animate-fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl mx-0 sm:mx-4 max-w-md w-full p-6 animate-bottom-sheet sm:animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-neutral-800 mb-4">{title}</h3>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>キャンセル</Button>
          {onConfirm && (
            <Button variant={confirmVariant} onClick={onConfirm}>{confirmLabel}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
