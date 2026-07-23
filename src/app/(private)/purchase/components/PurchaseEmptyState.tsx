import Image from 'next/image';
import Button from '@/components/Button';
import emptyIcon from '@/assets/icons/Frame 2610897.svg';

export default function PurchaseEmptyState() {
  return (
    <div className="flex w-[310px] flex-col items-center gap-[30px] self-center max-sm:w-full max-sm:gap-5">
      <span className="relative size-[100px] shrink-0 overflow-hidden">
        <Image src={emptyIcon} alt="" fill className="object-contain" />
      </span>

      <div className="flex w-full flex-col items-center gap-[50px] max-sm:gap-10">
        <div className="flex w-[299px] flex-col items-center gap-2.5 text-center">
          <p className="w-full text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            구매 내역이 없어요
          </p>
          <p className="w-full text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-800 max-sm:hidden">
            구매 요청을 승인하고
            <br />
            상품을 주문해보세요
          </p>
          <p className="hidden w-full text-[14px] leading-[1.6] tracking-[-0.35px] text-gray-800 max-sm:block">
            상품 리스트를 둘러보고
            <br />
            관리자에게 요청해보세요
          </p>
        </div>

        <Button className="w-full">구매 요청 내역으로 이동</Button>
      </div>
    </div>
  );
}
