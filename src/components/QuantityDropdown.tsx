'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';

type QuantityDropdownProps = {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const OPTION_HEIGHT_PX = 40;
const VISIBLE_OPTIONS = 5;

export default function QuantityDropdown({
  value,
  onChange,
  min = 10,
  max = 100,
  step = 10,
  className = '',
}: QuantityDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = Array.from(
    { length: Math.floor((max - min) / step) + 1 },
    (_, i) => min + i * step
  );

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
    <div className={`relative ${className}`.trim()} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="수량 변경"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex h-10 w-[72px] items-center justify-end gap-1"
      >
        <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          {value}
        </span>
        <span className="relative size-6 shrink-0 overflow-hidden max-sm:size-5">
          <Image
            src={open ? icChevronUp : icChevronDown}
            alt=""
            fill
            className="object-contain"
          />
        </span>
      </button>

      {open ? (
        <ul
          className="absolute right-0 top-full z-10 flex w-[72px] flex-col overflow-y-auto border border-solid border-gray-100 bg-white"
          style={{ maxHeight: OPTION_HEIGHT_PX * VISIBLE_OPTIONS }}
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="flex h-10 w-full cursor-pointer items-center justify-center text-[16px] font-bold tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
