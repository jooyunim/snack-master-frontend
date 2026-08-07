import Image from 'next/image';
import icChevronLeft from '@/assets/icons/ic_chevron_left.svg';
import icChevronRight from '@/assets/icons/ic_chevron__right.svg';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <div
      className={`flex h-10 w-full items-center justify-between ${className}`.trim()}
    >
      <p className="text-center text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        {page} of {totalPages}
      </p>
      <div className="flex items-center gap-[30px]">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => {
            if (!isFirst) onPageChange(page - 1);
          }}
          className={[
            'flex items-center gap-1.5',
            isFirst ? 'opacity-40 cursor-default' : 'cursor-pointer',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="relative size-6 shrink-0 overflow-hidden">
            <Image src={icChevronLeft} alt="" fill className="object-contain" />
          </span>
          <span className="text-center text-[16px] tracking-[-0.4px] text-gray-500">
            Prev
          </span>
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => {
            if (!isLast) onPageChange(page + 1);
          }}
          className={[
            'flex items-center gap-[5px]',
            isLast ? 'opacity-40 cursor-default' : 'cursor-pointer',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="text-center text-[16px] tracking-[-0.4px] text-gray-950">
            Next
          </span>
          <span className="relative size-6 shrink-0 overflow-hidden">
            <Image
              src={icChevronRight}
              alt=""
              fill
              className="object-contain"
            />
          </span>
        </button>
      </div>
    </div>
  );
}
