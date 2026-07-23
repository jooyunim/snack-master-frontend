'use client';

import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import visibilityOff from '@/assets/icons/Property 1=visibility_off.svg';
import visibilityOn from '@/assets/icons/Property 1=visibility_on.svg';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** disabled(읽기 전용) 상태에서 상단에 표시되는 플로팅 라벨 */
  floatingLabel?: string;
  showPasswordToggle?: boolean;
};

export default function Input({
  floatingLabel,
  showPasswordToggle = false,
  disabled,
  type = 'text',
  className = '',
  value,
  defaultValue,
  ...props
}: InputProps) {
  const [visible, setVisible] = useState(false);
  const isDisabled = Boolean(disabled);
  const inputType =
    showPasswordToggle && type === 'password'
      ? visible
        ? 'text'
        : 'password'
      : type;

  if (isDisabled) {
    return (
      <div
        className={`flex h-14 w-full flex-col justify-between border-b border-solid border-gray-200 px-1 py-2 ${className}`.trim()}
      >
        {floatingLabel ? (
          <span className="text-[12px] tracking-[-0.3px] text-gray-500">
            {floatingLabel}
          </span>
        ) : null}
        <span className="text-[16px] tracking-[-0.4px] text-gray-300">
          {value ?? defaultValue}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex h-14 w-full items-center justify-between overflow-hidden border-b border-solid border-gray-600 px-1 py-2 ${className}`.trim()}
    >
      <input
        type={inputType}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        className="w-full bg-transparent text-[16px] tracking-[-0.4px] text-gray-950 outline-none placeholder:text-gray-500"
        {...props}
      />
      {showPasswordToggle ? (
        <button
          type="button"
          aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
          onClick={() => setVisible((prev) => !prev)}
          className="relative size-4 shrink-0 overflow-hidden"
        >
          <Image
            src={visible ? visibilityOn : visibilityOff}
            alt=""
            fill
            className="object-contain"
          />
        </button>
      ) : null}
    </div>
  );
}
