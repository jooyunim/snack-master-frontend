import {
  REQUEST_MESSAGE_MAX_LENGTH,
  type RequestMessageProps,
} from '@/features/cart/types/cart.type';

export default function RequestMessage({
  value,
  onChange,
  placeholder = '메시지를 입력해주세요',
  readOnly = false,
  error,
}: RequestMessageProps) {
  return (
    <section className="flex w-full flex-col gap-5 max-sm:gap-3.5">
      <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
        요청 메시지
      </p>
      {readOnly ? (
        <div className="h-[165px] w-full overflow-y-auto rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-500 max-sm:p-4">
          {value}
        </div>
      ) : (
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="request-message" className="sr-only">
            요청 메시지
          </label>
          <textarea
            id="request-message"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            maxLength={REQUEST_MESSAGE_MAX_LENGTH}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'request-message-error' : undefined}
            className="h-[165px] w-full resize-none overflow-y-auto rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-950 outline-none placeholder:text-gray-500 max-sm:p-4"
          />
          <p className="self-end text-[12px] tracking-[-0.3px] text-gray-500">
            {value?.length ?? 0}/{REQUEST_MESSAGE_MAX_LENGTH}
          </p>
          {error ? (
            <p
              id="request-message-error"
              className="px-1 text-[14px] tracking-[-0.35px] text-red-500"
            >
              {error}
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
