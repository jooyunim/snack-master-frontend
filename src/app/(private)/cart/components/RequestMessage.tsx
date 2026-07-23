type RequestMessageProps = {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export default function RequestMessage({
  value,
  placeholder = '메시지를 입력해주세요',
  readOnly = false,
}: RequestMessageProps) {
  return (
    <section className="flex w-full flex-col gap-5 max-sm:gap-3.5">
      <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
        요청 메시지
      </p>
      {readOnly ? (
        <div className="h-[165px] w-full overflow-hidden rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-500 max-sm:p-4">
          {value}
        </div>
      ) : (
        <textarea
          placeholder={placeholder}
          defaultValue={value}
          className="h-[165px] w-full resize-none overflow-hidden rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-950 outline-none placeholder:text-gray-500 max-sm:p-4"
        />
      )}
    </section>
  );
}
