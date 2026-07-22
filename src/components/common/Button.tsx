import { ButtonHTMLAttributes } from 'react';

// Figma 디자인 시스템 Button 컴포넌트(type=filled/line/sub × state=normal/hover/disabled × size=Default/sm) 기준.
// hover/disabled는 CSS 상태 셀렉터로 처리하고, size는 filled/line에만 적용된다 (sub는 항상 컴팩트 사이즈 고정).

type ButtonVariant = 'filled' | 'line' | 'sub';
type ButtonSize = 'default' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  filled:
    'bg-gray-950 text-white font-bold hover:bg-gray-900 disabled:bg-gray-100 disabled:text-gray-300',
  line: 'bg-white border border-gray-300 text-gray-950 font-bold hover:border-gray-950 disabled:border-gray-100 disabled:text-gray-300',
  sub: 'bg-white border border-gray-300 text-gray-900 font-normal hover:text-gray-950 hover:border-gray-400 disabled:text-gray-300 disabled:border-gray-100',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  default: 'h-16 px-4 py-3 text-[16px]',
  sm: 'h-10 px-4 py-2 text-[16px]',
};

export default function Button({
  variant = 'filled',
  size = 'default',
  className,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const sizeClasses =
    variant === 'sub' ? 'h-11 px-5 py-3 text-[16px]' : SIZE_CLASSES[size];

  return (
    <button
      type={type}
      disabled={disabled}
      className={`font-suit inline-flex items-center justify-center whitespace-nowrap rounded-[2px] tracking-[-0.025em] transition-colors disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${sizeClasses} ${className ?? ''}`}
      {...props}
    />
  );
}
