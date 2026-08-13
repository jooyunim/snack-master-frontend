import Image from 'next/image';
import icAlert from '@/assets/icons/ic_!.svg';
import iconX from '@/assets/icons/icon_X2.svg';

type ToastProps = {
  remainingBudget?: string;
  onClose?: () => void;
};

const DEFAULT_MESSAGE: string =
  '예산이 부족합니다.\n수량을 줄이거나 항목을 제거해주세요.';

export default function Toast({ remainingBudget, onClose }: ToastProps) {
  return (
    <div
      className="flex h-20 w-full items-center justify-between overflow-hidden rounded bg-black/80 pl-[50px] pr-[60px] shadow-[0px_10px_8px_0px_rgba(0,0,0,0.1)] backdrop-blur-[15px] max-lg:pl-10 max-lg:pr-8 max-sm:h-16 max-sm:pl-6 max-sm:pr-3.5"
      role="alert"
    >
      <div className="flex items-center gap-2">
        <span className="relative size-6 shrink-0 overflow-hidden">
          <Image src={icAlert} alt="" fill className="object-contain" />
        </span>
        <p className="text-[20px] font-bold tracking-[-0.5px] text-white max-sm:whitespace-pre-line max-sm:text-[14px] max-sm:leading-[1.6] max-sm:tracking-[-0.35px]">
          {DEFAULT_MESSAGE}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3.5 text-[20px] font-bold tracking-[-0.5px] text-white max-lg:hidden">
          <p>남은 예산</p>
          <p>
            {remainingBudget}
            <span>원</span>
          </p>
        </div>

        <button
          type="button"
          className="relative size-6 shrink-0 overflow-hidden"
          aria-label="토스트 닫기"
          onClick={onClose}
        >
          <Image src={iconX} alt="" fill className="object-contain" />
        </button>
      </div>
    </div>
  );
}