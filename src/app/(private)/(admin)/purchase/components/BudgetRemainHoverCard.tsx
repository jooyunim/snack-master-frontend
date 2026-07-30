type Props = {
  remainingBudget: number;
  lastMonthRemaining: number | null;
};

export default function BudgetRemainHoverCard({
  remainingBudget,
  lastMonthRemaining,
}: Props) {
  const diff =
    lastMonthRemaining == null ? null : lastMonthRemaining - remainingBudget; // 피그마: 남은예산 기준

  return (
    // 부모에 group 있을 때만 보임
    <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden w-[280px] -translate-x-1/2 flex-col gap-2 overflow-hidden rounded bg-gray-950 p-4 text-white group-hover:flex max-sm:left-4 max-sm:translate-x-0">
      <div className="flex items-center gap-1 text-[16px] font-extrabold tracking-[-0.4px]">
        <span>이번 달 남은 예산:</span>
        <span>{remainingBudget.toLocaleString('ko-KR')}원</span>
      </div>
      <div className="flex items-center gap-1 text-[14px] tracking-[-0.35px]">
        <span>지난 달 남은 예산:</span>
        <span>
          {lastMonthRemaining == null
            ? '-'
            : `${lastMonthRemaining.toLocaleString('ko-KR')}원`}
        </span>
      </div>
      {diff != null ? (
        <p className="text-[14px] tracking-[-0.35px]">
          {diff >= 0
            ? `지난 달보다 ${diff.toLocaleString('ko-KR')}원 더 사용했어요`
            : `지난 달보다 ${Math.abs(diff).toLocaleString('ko-KR')}원 덜 사용했어요`}
        </p>
      ) : null}
    </div>
  );
}
