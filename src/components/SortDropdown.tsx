'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';

export type SortOption = { label: string; value: string };

const DEFAULT_OPTIONS: SortOption[] = [
  { label: '최신순', value: '최신순' },
  { label: '판매순', value: '판매순' },
  { label: '낮은 가격순', value: '낮은 가격순' },
  { label: '높은 가격순', value: '높은 가격순' },
];

type SortDropdownProps = {
  className?: string;
  // 아래 세 개는 전부 옵셔널 — 안 넘기면 기존과 동일하게 순수 장식용 드롭다운으로 동작 (하위호환)
  options?: SortOption[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function SortDropdown({
  className = '',
  options = DEFAULT_OPTIONS,
  value,
  onChange,
}: SortDropdownProps) {
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

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className={`relative ${className}`.trim()} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-[130px] cursor-pointer items-center justify-between border border-solid border-gray-100 bg-white px-4 py-2.5"
      >
        <span className="text-[16px] tracking-[-0.4px] text-gray-950">
          {selectedLabel ?? '정렬'}
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
        <ul className="absolute right-0 top-full z-10 flex w-[130px] flex-col overflow-hidden border border-t-0 border-solid border-gray-100 bg-white max-sm:left-0 max-sm:right-auto">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                className="flex h-[50px] w-full cursor-pointer items-center py-2 pl-4 pr-5 text-left"
              >
                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                  {option.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
