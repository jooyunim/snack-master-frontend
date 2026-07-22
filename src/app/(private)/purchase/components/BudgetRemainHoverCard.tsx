export default function BudgetRemainHoverCard() {
  return (
    <div className="absolute left-1/2 top-5 z-10 flex w-[260px] -translate-x-1/2 flex-col gap-2 overflow-hidden rounded bg-gray-950 p-6 text-white max-sm:left-4 max-sm:top-[141px] max-sm:translate-x-0">
      <div className="flex items-center gap-1 text-[16px] font-extrabold tracking-[-0.4px]">
        <span>이번 달 남은 예산:</span>
        <span>126,000원</span>
      </div>
      <div className="flex items-center gap-1 text-[14px] tracking-[-0.35px]">
        <span>지난 달 남은 예산:</span>
        <span>150,000원</span>
      </div>
      <p className="text-[14px] tracking-[-0.35px]">
        지난 달보다 24,000원 더 사용했어요
      </p>
    </div>
  );
}
