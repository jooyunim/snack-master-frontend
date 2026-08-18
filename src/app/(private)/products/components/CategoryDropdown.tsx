'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';

export type CategoryOption = {
  id: number;
  name: string;
};

type CategoryDropdownProps = {
  placeholder: string;
  value: CategoryOption | null;
  options: CategoryOption[];
  onChange: (option: CategoryOption) => void;
  disabled?: boolean;
  className?: string;
};

export default function CategoryDropdown({
  placeholder,
  value,
  options,
  onChange,
  disabled = false,
  className = '',
}: CategoryDropdownProps) {
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
    <div
      ref={containerRef}
      className={`relative min-w-0 flex-1 ${className}`.trim()}
    >
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-14 w-full items-center justify-between border border-solid border-gray-600 bg-white px-4 py-2.5 disabled:border-gray-200 disabled:bg-gray-50"
      >
        <span
          className={`whitespace-nowrap text-[16px] tracking-[-0.4px] ${value ? 'text-gray-950' : 'text-gray-500'}`}
        >
          {value ? value.name : placeholder}
        </span>
        <span className="relative size-4 shrink-0 overflow-hidden">
          <Image
            src={open ? icChevronUp : icChevronDown}
            alt=""
            fill
            className="object-contain"
          />
        </span>
      </button>

      {open ? (
        <ul className="absolute left-0 top-full z-10 flex max-h-60 w-full flex-col overflow-auto border border-t-0 border-solid border-gray-200 bg-white">
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="flex h-[50px] w-full items-center gap-1 py-2 pl-4 pr-5 text-left max-sm:px-4"
              >
                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                  {option.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
