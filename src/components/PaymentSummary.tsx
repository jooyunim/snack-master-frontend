type PaymentSummaryProps = {
  pointsUsed: number;
  pointsEarned: number;
  paidAmount: number;
  variant?: 'order' | 'refund';
};

export default function PaymentSummary({
  pointsUsed,
  pointsEarned,
  paidAmount,
  variant = 'order',
}: PaymentSummaryProps) {
  const formatPoint = (amount: number) => `${amount.toLocaleString('ko-KR')} P`;
  const formatWon = (amount: number) => `${amount.toLocaleString('ko-KR')}원`;

  const isRefund = variant === 'refund';
  const row1Label = isRefund ? '적립금 차감액' : '포인트 사용액';
  const row2Label = isRefund ? '적립금 환불액' : '적립액';
  const totalLabel = isRefund ? '총 환불금액' : '실결제액';
  const ariaLabel = isRefund ? '환불 요약' : '결제 요약';
  // 환불: 차감=적립 회수(pointsEarned), 환불액=사용 복구(pointsUsed), 총액=실결제(paidAmount)
  const row1Value = isRefund
    ? formatPoint(pointsEarned)
    : formatPoint(pointsUsed);
  const row2Value = isRefund
    ? formatPoint(pointsUsed)
    : formatPoint(pointsEarned);

  return (
    <section
      className="flex w-full flex-col gap-2.5 rounded-[2px] bg-white px-[60px] py-10 shadow-[0_0_10px_rgba(0,0,0,0.12)] max-lg:px-5 max-lg:pb-[30px] max-lg:pt-5 max-lg:shadow-[0_0_3px_rgba(0,0,0,0.1)] max-sm:gap-4 max-sm:p-0 max-sm:shadow-none max-sm:border-t max-sm:border-solid max-sm:border-gray-100 max-sm:pt-5"
      aria-label={ariaLabel}
    >
      <div className="flex w-full items-center justify-between text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        <p>{row1Label}</p>
        <p>{row1Value}</p>
      </div>
      <div className="flex w-full items-center justify-between text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        <p>{row2Label}</p>
        <p>{row2Value}</p>
      </div>
      <div className="flex w-full items-center justify-between text-gray-950">
        <p className="text-[18px] font-bold tracking-[-0.45px]">{totalLabel}</p>
        <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[18px] max-sm:tracking-[-0.45px]">
          {formatWon(paidAmount)}
        </p>
      </div>
    </section>
  );
}
