'use client';

import { useId, useState } from 'react';

type Props = {
  remainingBudget: number;
  lastMonthRemaining: number | null;
};

export default function BudgetRemainHoverCard({
  remainingBudget,
  lastMonthRemaining,
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const diff =
    lastMonthRemaining == null ? null : lastMonthRemaining - remainingBudget;

  return (
    <>
      {/* 클릭/키보드 토글용 트리거 (button → Enter/Space 기본 지원) */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="남은 예산 상세 보기"
        onClick={() => setOpen((prev) => !prev)}
        className="absolute inset-0 z-[1] cursor-pointer rounded bg-transparent"
      />

      {/* 호버(group-hover) + 클릭(open) 둘 다로 표시 */}
      <div
        id={panelId}
        role="region"
        aria-label="남은 예산 상세"
        className={[
          'absolute left-1/2 top-full z-10 mt-2 w-[280px] -translate-x-1/2 flex-col gap-2 overflow-hidden rounded bg-gray-950 p-4 text-white max-sm:left-4 max-sm:translate-x-0',
          open ? 'flex' : 'hidden',
          'group-hover:flex',
        ].join(' ')}
      >
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
    </>
  );
}