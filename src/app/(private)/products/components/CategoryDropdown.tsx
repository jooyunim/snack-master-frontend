import Image from 'next/image';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';

const SUB_CATEGORY_OPTIONS = [
  '청량 ∙ 탄산 음료',
  '과즙음료',
  '에너지음료',
  '이온음료',
  '건강음료',
] as const;

type CategoryDropdownProps = {
  className?: string;
};

export default function CategoryDropdown({
  className = '',
}: CategoryDropdownProps) {
  return (
    <div className={`relative min-w-0 flex-1 ${className}`.trim()}>
      <div className="flex h-14 w-full items-center justify-between border border-solid border-gray-600 bg-white px-4 py-2.5">
        <span className="whitespace-nowrap text-[16px] tracking-[-0.4px] text-gray-950">
          청량 ∙ 탄산 음료
        </span>
        <span className="relative size-4 shrink-0 overflow-hidden">
          <Image src={icChevronUp} alt="" fill className="object-contain" />
        </span>
      </div>

      <ul className="absolute left-0 top-full z-10 flex w-full flex-col overflow-hidden border border-t-0 border-solid border-gray-200 bg-white">
        {SUB_CATEGORY_OPTIONS.map((option) => (
          <li
            key={option}
            className="flex h-[50px] w-full items-center gap-1 py-2 pl-4 pr-5 max-sm:px-4"
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
