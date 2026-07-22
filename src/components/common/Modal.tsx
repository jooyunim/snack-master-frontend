'use client';

import { ReactNode, useEffect } from 'react';

// Figma "dimmed" 컴포넌트 기준 오버레이 셸. 실제 패널(sheet/alert 등) 스타일은 children이 각자 정의한다.
// dimmed 정확한 opacity 값은 CLAUDE.md에 수치가 없어 표준값(50%)으로 임시 적용.

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
}
