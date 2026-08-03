import Link from 'next/link';
import Button from '@/components/Button';
import RequestMessage from '../../components/RequestMessage';
import RequestItemsSection, {
  RequestItem,
} from '@/components/RequestItemsSection';

// 부모(complete/page)에서 API 데이터를 props로 받아 렌더링
type RequestCompleteContentProps = {
  items: readonly RequestItem[];
  orderAmount: string;
  shippingFee: string;
  totalAmount: string;
  requestMessage?: string | null;
};

export default function RequestCompleteContent({
  items,
  orderAmount,
  shippingFee,
  totalAmount,
  requestMessage,
}: RequestCompleteContentProps) {
  return (
    <div className="flex w-full flex-col gap-[30px]">
      <h1 className="w-full text-center text-[30px] font-bold tracking-[-0.75px] text-gray-950 max-sm:text-[24px] max-sm:tracking-[-0.6px]">
        구매 요청이 완료되었습니다.
      </h1>

      <div className="flex w-full flex-col items-center gap-[60px]">
        <div className="flex w-full flex-col gap-10">
          <RequestItemsSection
            itemCount={items.length}
            items={items}
            orderAmount={orderAmount}
            shippingFee={shippingFee}
            totalAmount={totalAmount}
          />
          {requestMessage ? (
            <RequestMessage value={requestMessage} readOnly />
          ) : null}
        </div>

        <div className="flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Link href="/cart" className="min-w-0 flex-1">
            <Button variant="line" className="w-full">
              장바구니로 돌아가기
            </Button>
          </Link>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1">
            <Link href="/purchase-requests">
              <Button variant="filled" className="w-full">
                요청내역 확인
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
