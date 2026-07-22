import Image from 'next/image';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';

const SORT_OPTIONS = [
  '최신순',
  '판매순',
  '낮은 가격순',
  '높은 가격순',
] as const;

type SortDropdownProps = {
  className?: string;
};

export default function SortDropdown({ className = '' }: SortDropdownProps) {
  return (
    <div className={`relative ${className}`.trim()}>
      <div className="flex h-11 w-[110px] items-center justify-between border border-solid border-gray-100 bg-white px-4 py-2.5">
        <span className="text-[16px] tracking-[-0.4px] text-gray-950">정렬</span>
        <span className="relative size-4 shrink-0 overflow-hidden">
          <Image src={icChevronUp} alt="" fill className="object-contain" />
        </span>
      </div>

      <ul className="absolute right-0 top-full z-10 flex w-[110px] flex-col overflow-hidden border border-t-0 border-solid border-gray-100 bg-white max-sm:left-0 max-sm:right-auto">
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className="flex h-[50px] w-full items-center py-2 pl-4 pr-5"
          >
            <span className="text-[16px] tracking-[-0.4px] text-gray-950">
              {option}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
