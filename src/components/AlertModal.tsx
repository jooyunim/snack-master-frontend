import Image, { type StaticImageData } from 'next/image';
import Button from '@/components/Button';

type AlertModalProps = {
  icon: StaticImageData;
  title?: string;
  content?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  className?: string;
  // 옵셔널 — 안 넘기면 기존과 동일하게 버튼이 아무 동작 안 함 (하위호환)
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmDisabled?: boolean;
  /** false면 확인 버튼만 표시 (성공 안내 등) */
  showCancel?: boolean;
};

const DEFAULT_TITLE = '승인 완료';
const DEFAULT_CONTENT =
  '승인이 완료되었어요!\n구매 내역을 통해 배송 현황을 확인해보세요';
const DEFAULT_CANCEL_LABEL = '홈으로';
const DEFAULT_CONFIRM_LABEL = '탈퇴시키기';

export default function AlertModal({
  icon,
  title = DEFAULT_TITLE,
  content = DEFAULT_CONTENT,
  cancelLabel = DEFAULT_CANCEL_LABEL,
  confirmLabel = DEFAULT_CONFIRM_LABEL,
  className = '',
  onCancel,
  onConfirm,
  confirmDisabled = false,
  showCancel = true,
}: AlertModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-modal-title"
      className={`flex w-[512px] flex-col items-center gap-9 rounded-[6px] bg-white px-[30px] pb-[30px] pt-10 shadow-[0_0_15px_rgba(0,0,0,0.14)] max-sm:w-[327px] ${className}`.trim()}
    >
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <h2
            id="alert-modal-title"
            className="text-[18px] font-bold tracking-[-0.45px] text-gray-950"
          >
            {title}
          </h2>

          <div className="flex flex-col items-center gap-2">
            <span className="relative size-5 shrink-0 overflow-hidden max-sm:hidden">
              <Image src={icon} alt="" fill className="object-contain" />
            </span>
            <p className="whitespace-pre-line text-center text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-900">
              {content}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-5 max-sm:gap-2.5">
        {showCancel && (
          <Button
            type="button"
            variant="line"
            onClick={onCancel}
            className="min-w-0 flex-1 max-sm:h-[50px] max-sm:text-[14px] max-sm:tracking-[-0.35px]"
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          type="button"
          variant="filled"
          onClick={onConfirm}
          disabled={confirmDisabled}
          className="min-w-0 flex-1 max-sm:h-[50px] max-sm:text-[14px] max-sm:tracking-[-0.35px]"
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
