import ChevronRightIcon from '../icons/ChevronRightIcon';

// Figma 디자인 시스템 "pagination" 컴포넌트(size=mo / size=pc·tb) 기준.
// "N of M" 표시 + Prev/Next만 있는 형태라 offset(page/totalPages) 응답과 그대로 맞는다.
// SUIT 폰트는 전역 설정(레이아웃) 완료 전까지 시스템 폰트로 대체 렌더링된다.

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div
      className={`flex h-10 items-center justify-between ${className ?? ''}`}
    >
      <p className="font-['SUIT'] text-[16px] leading-none tracking-[-0.025em] text-[#222222] md:text-[18px]">
        {page} of {totalPages}
      </p>
      <div className="flex items-center gap-[30px]">
        <button
          type="button"
          onClick={() => hasPrev && onPageChange(page - 1)}
          disabled={!hasPrev}
          aria-label="이전 페이지"
          className="flex items-center gap-1.5 disabled:opacity-40"
        >
          <ChevronRightIcon className="size-3 -scale-x-100 text-[#878787]" />
          <span className="font-['SUIT'] text-[16px] leading-none tracking-[-0.025em] text-[#878787] md:text-[18px]">
            Prev
          </span>
        </button>
        <button
          type="button"
          onClick={() => hasNext && onPageChange(page + 1)}
          disabled={!hasNext}
          aria-label="다음 페이지"
          className="flex items-center gap-1.5 disabled:opacity-40"
        >
          <span className="font-['SUIT'] text-[16px] leading-none tracking-[-0.025em] text-[#222222] md:text-[18px]">
            Next
          </span>
          <ChevronRightIcon className="size-3 text-[#222222]" />
        </button>
      </div>
    </div>
  );
}
