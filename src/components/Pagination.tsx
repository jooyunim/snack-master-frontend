import Image from 'next/image';
import icChevronLeft from '@/assets/icons/ic_chevron_left.svg';
import icChevronRight from '@/assets/icons/ic_chevron__right.svg';

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  onChange?: (page: number) => void;
  className?: string;
};

export default function Pagination({ className = '' }: PaginationProps) {
  return (
    <div
      className={`flex h-10 w-full items-center justify-between ${className}`.trim()}
    >
      <p className="text-center text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        1 of 4
      </p>
      <div className="flex items-center gap-[30px]">
        <div className="flex items-center gap-1.5">
          <span className="relative size-6 shrink-0 overflow-hidden">
            <Image src={icChevronLeft} alt="" fill className="object-contain" />
          </span>
          <span className="text-center text-[16px] tracking-[-0.4px] text-gray-500">
            Prev
          </span>
        </div>
        <div className="flex items-center gap-[5px]">
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
        </div>
      </div>
    </div>
  );
}
