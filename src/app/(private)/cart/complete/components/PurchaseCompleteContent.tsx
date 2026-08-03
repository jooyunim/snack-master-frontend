import Link from 'next/link';
import Button from '@/components/Button';
import RequestItemsSection, {
  type RequestItem,
} from '@/components/RequestItemsSection';

// 부모(complete/page)에서 API 데이터를 props로 받아 렌더링
type PurchaseCompleteContentProps = {
  items: readonly RequestItem[];
  orderAmount: string;
  shippingFee: string;
  totalAmount: string;
  pointsUsed: string;
  reward: string;
  paidAmount: string;
};

export default function PurchaseCompleteContent({
  items,
  orderAmount,
  shippingFee,
  totalAmount,
  pointsUsed,
  reward,
  paidAmount,
}: PurchaseCompleteContentProps) {
  return (
    <div className="flex w-full flex-col items-center gap-[70px]">
      <h1 className="w-full text-center text-[30px] font-bold tracking-[-0.75px] text-gray-950 max-sm:text-[24px] max-sm:tracking-[-0.6px]">
        구매가 완료되었습니다.
      </h1>

      <div className="flex w-full flex-col items-center gap-[60px]">
        <RequestItemsSection
          itemCount={items.length}
          items={items}
          orderAmount={orderAmount}
          shippingFee={shippingFee}
          totalAmount={totalAmount}
        />

        <div className="flex flex-col w-full justify-end gap-2 text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          <p className="text-right">포인트 사용액: {pointsUsed} P</p>
          <p className="text-right">적립액: {reward} P</p>
          <p className="text-right text-[24px] font-extrabold tracking-[-0.6px] text-black max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            실결제액: {paidAmount}
          </p>
        </div>

        <div className="flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Link href="/cart" className="min-w-0 flex-1">
            <Button variant="line" className="w-full">
              장바구니로 돌아가기
            </Button>
          </Link>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1">
            <Link href="/purchase">
              <Button variant="filled" className="w-full">
                구매내역 확인
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
