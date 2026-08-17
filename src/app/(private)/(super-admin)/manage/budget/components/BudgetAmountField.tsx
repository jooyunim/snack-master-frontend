type BudgetAmountFieldProps = {
  label: string;
  placeholder?: string;
  subscription?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function BudgetAmountField({
  label,
  placeholder = '예산을 입력해주세요',
  subscription,
  value,
  onChange,
  className = '',
}: BudgetAmountFieldProps) {
  return (
    <div
      className={`flex w-full max-w-[447px] flex-col gap-3 max-lg:max-w-[340px] max-sm:max-w-none ${className}`.trim()}
    >
      <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        {label}
      </p>
      <div className="flex w-full items-center gap-1 border-b-2 border-solid border-gray-800 pb-3">
        <input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[32px] font-bold tracking-[-0.8px] text-gray-950 outline-none placeholder:text-gray-200 max-sm:text-[30px] max-sm:tracking-[-0.75px]"
        />
        <span className="shrink-0 text-[40px] font-extrabold tracking-[-1px] text-gray-950 max-sm:text-[30px] max-sm:font-bold max-sm:tracking-[-0.75px]">
          원
        </span>
      </div>
      {subscription ? (
        <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          {subscription}
        </p>
      ) : null}
    </div>
  );
}
