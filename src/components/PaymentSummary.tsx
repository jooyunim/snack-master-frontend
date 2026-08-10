// PaymentSummary.tsx
type PaymentSummaryProps = {
  pointsUsed: string;
  pointsEarned: string;
  paidAmount: string;
};

export default function PaymentSummary({
  pointsUsed,
  pointsEarned,
  paidAmount,
}: PaymentSummaryProps) {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-[2px] bg-white px-[60px] py-10 shadow-[0_0_10px_rgba(0,0,0,0.12)] max-lg:px-5 max-lg:pb-[30px] max-lg:pt-5 max-lg:shadow-[0_0_3px_rgba(0,0,0,0.1)] max-sm:gap-4 max-sm:p-0 max-sm:shadow-none max-sm:border-t max-sm:border-solid max-sm:border-gray-100 max-sm:pt-5">
      <div className="flex w-full items-center justify-between text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        <p>포인트 사용액</p>
        <p>{pointsUsed}</p>
      </div>
      <div className="flex w-full items-center justify-between text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        <p>적립액</p>
        <p>{pointsEarned}</p>
      </div>
      <div className="flex w-full items-center justify-between text-gray-950">
        <p className="text-[18px] font-bold tracking-[-0.45px]">실결제액</p>
        <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[18px] max-sm:tracking-[-0.45px]">
          {paidAmount}
        </p>
      </div>
    </div>
  );
}
