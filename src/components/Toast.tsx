import Image from 'next/image';
import icAlert from '@/assets/icons/ic_!.svg';
import iconCheck from '@/assets/icons/icon_check.svg';
import iconX from '@/assets/icons/icon_X.svg';

type ToastVariant = 'error' | 'success';

type ToastProps = {
  variant?: ToastVariant;
  message?: string;
  remainingBudget?: string;
  className?: string;
};

const DEFAULT_MESSAGE: Record<ToastVariant, string> = {
  error: '예산이 부족합니다.\n수량을 줄이거나 항목을 제거해주세요.',
  success: '예산이 변경되었습니다.',
};

export default function Toast({
  variant = 'error',
  message,
  remainingBudget = '60,000',
  className = '',
}: ToastProps) {
  const displayMessage = message ?? DEFAULT_MESSAGE[variant];
  const isSuccess = variant === 'success';
  const icon = isSuccess ? iconCheck : icAlert;

  return (
    <div
      className={`flex h-20 w-full items-center justify-between overflow-hidden rounded bg-black/80 pl-[50px] pr-[60px] shadow-[0px_10px_8px_0px_rgba(0,0,0,0.1)] backdrop-blur-[15px] max-lg:pl-10 max-lg:pr-8 max-sm:h-16 max-sm:pl-6 max-sm:pr-3.5 ${className}`.trim()}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="relative size-6 shrink-0 overflow-hidden">
          <Image src={icon} alt="" fill className="object-contain" />
        </span>
        <p className="text-[20px] font-bold tracking-[-0.5px] text-white max-sm:whitespace-pre-line max-sm:text-[14px] max-sm:leading-[1.6] max-sm:tracking-[-0.35px]">
          {displayMessage}
        </p>
      </div>

      {isSuccess ? (
        <span className="relative size-6 shrink-0 overflow-hidden">
          <Image src={iconX} alt="" fill className="object-contain" />
        </span>
      ) : (
        <>
          <div className="flex items-center gap-3.5 text-[20px] font-bold tracking-[-0.5px] text-white max-lg:hidden">
            <p>남은 예산</p>
            <p>
              {remainingBudget}
              <span>원</span>
            </p>
          </div>

          <span className="relative hidden size-6 shrink-0 overflow-hidden max-lg:block">
            <Image src={iconX} alt="" fill className="object-contain" />
          </span>
        </>
      )}
    </div>
  );
}

// <Toast />                          // error (기본)
// <Toast variant="success" />        // 예산 변경 성공
// <Toast remainingBudget="60,000" />
