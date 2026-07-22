'use client';

import { useEffect, useRef, useState } from 'react';
import ChevronRightIcon from '../icons/ChevronRightIcon';

// Figma 디자인 시스템 "dropdown button" + "dropdown menu item" 조합 기준.

export interface DropdownOption {
  label: string;
  value: number | string;
}

interface DropdownProps {
  placeholder: string;
  value: DropdownOption | null;
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
  disabled?: boolean;
  className?: string;
}

export default function Dropdown({
  placeholder,
  value,
  options,
  onChange,
  disabled,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className={`relative ${className ?? ''}`} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-14 w-full items-center justify-between border border-gray-200 bg-white px-4 py-2.5 disabled:bg-gray-50 disabled:text-gray-300`}
      >
        <span
          className={`font-suit text-[16px] tracking-[-0.025em] ${value ? 'text-gray-950' : 'text-gray-500'}`}
        >
          {value ? value.label : placeholder}
        </span>
        <ChevronRightIcon
          className={`size-3 rotate-90 text-gray-500 transition-transform ${open ? '-rotate-90' : ''}`}
        />
      </button>
      {open && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto border border-gray-200 bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="font-suit block w-full px-4 py-2.5 text-left text-[16px] tracking-[-0.025em] text-gray-950 hover:bg-gray-25"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
