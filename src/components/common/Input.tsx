'use client';

import { InputHTMLAttributes, useState } from 'react';

// Figma 디자인 시스템 input 컴포넌트 기준. bottom-border + label(항상 값 위에 노출).
// border 색: normal #D1D1D1 → focus/입력완료 #696969 → error #F31D1D (CLAUDE.md 확정 규칙)

type InputSize = 'sm' | 'md' | 'lg';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  error?: boolean;
  errorMessage?: string;
  size?: InputSize;
}

const SIZE_HEIGHT: Record<InputSize, string> = {
  sm: 'h-14',
  md: 'h-16',
  lg: 'h-[72px]',
};

export default function Input({
  label,
  value,
  onChange,
  suffix,
  error,
  errorMessage,
  size = 'md',
  disabled,
  className,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = disabled
    ? 'border-gray-300'
    : error
      ? 'border-error'
      : focused || value
        ? 'border-gray-600'
        : 'border-gray-200';

  return (
    <div className={`flex flex-col gap-1 ${className ?? ''}`}>
      <label className="font-suit text-[14px] tracking-[-0.025em] text-gray-400">
        {label}
      </label>
      <div
        className={`flex items-center gap-1 border-b pb-2 ${SIZE_HEIGHT[size]} ${borderColor}`}
      >
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`font-suit min-w-0 flex-1 text-[16px] tracking-[-0.025em] outline-none ${
            disabled ? 'text-gray-300' : 'text-gray-950'
          } placeholder:text-gray-400`}
          {...props}
        />
        {suffix && (
          <span className="font-suit shrink-0 text-[16px] tracking-[-0.025em] text-gray-950">
            {suffix}
          </span>
        )}
      </div>
      {error && errorMessage && (
        <p className="font-suit text-[14px] tracking-[-0.025em] text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
