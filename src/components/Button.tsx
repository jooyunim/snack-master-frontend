import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'filled' | 'line' | 'sub';
type ButtonSize = 'default' | 'sm';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClassName =
  'inline-flex cursor-pointer items-center justify-center rounded-[2px] text-center whitespace-nowrap transition-colors disabled:cursor-not-allowed';

const variantSizeClassName: Record<
  ButtonVariant,
  Record<ButtonSize, string>
> = {
  //gray-950 배경 / 흰 글자, hover gray-900, disabled gray-100+gray-300
  filled: {
    default:
      'h-16 w-full px-4 py-3 text-[16px] font-bold tracking-[-0.4px] bg-gray-950 text-white hover:bg-gray-900 disabled:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-gray-100',
    sm: 'px-5 py-2.5 text-[16px] font-normal tracking-[-0.4px] bg-gray-950 text-white hover:bg-gray-900 disabled:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-gray-100',
  },
  //흰 배경 + gray-300 보더, hover gray-200, disabled 보더 gray-100+글자 gray-200
  line: {
    default:
      'h-16 w-full px-4 py-3 text-[16px] font-bold tracking-[-0.4px] bg-white text-gray-950 border border-solid border-gray-300 hover:bg-gray-200 disabled:border-gray-100 disabled:text-gray-200 disabled:hover:bg-white',
    sm: 'px-5 py-2.5 text-[16px] font-bold tracking-[-0.4px] bg-white text-gray-950 border border-solid border-gray-300 hover:bg-gray-200 disabled:border-gray-100 disabled:text-gray-200 disabled:hover:bg-white',
  },
  //흰 배경 + gray-300 보더 / gray-900 글자, hover·disabled gray-50, disabled 글자 gray-400
  sub: {
    default:
      'px-5 py-3 text-[16px] font-normal tracking-[-0.4px] bg-white text-gray-900 border border-solid border-gray-300 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-gray-50',
    sm: 'px-5 py-3 text-[13px] font-normal tracking-[-0.325px] bg-white text-gray-900 border border-solid border-gray-300 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-gray-50',
  },
};

export default function Button({
  variant = 'filled',
  size = 'default',
  type = 'button',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClassName} ${variantSizeClassName[variant][size]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

// default — filled/line: 높이 64px, full width, Bold 16px
// sm — 컴팩트 (filled: Regular 16px / sub: Regular 13px)

// import Button from '@/components/Button';

// <Button>확인</Button>
// <Button variant="line">취소</Button>
// <Button variant="sub" size="sm">더보기</Button>
// <Button disabled>비활성</Button>

// hover/disabled는 CSS로 처리되므로 state prop은 없습니다.
// 너비 조절이 필요하면 className="w-full" 등으로 덮어쓰면 됩니다.
