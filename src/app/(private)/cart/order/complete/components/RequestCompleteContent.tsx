import Link from 'next/link';
import Button from '@/components/Button';
import RequestItemsSection, {
  type RequestItem,
} from '../../../../../../components/RequestItemsSection';
import RequestMessage from '../../../components/RequestMessage';

const COMPLETE_ITEMS: readonly RequestItem[] = [
  {
    id: 1,
    name: '코카콜라 제로',
    unitPrice: '2,000원',
    quantity: '수량 4개',
    totalPrice: '26,000원',
    imageSrc: '/images/coke-zero.png',
  },
  {
    id: 2,
    name: '코카콜라 제로',
    unitPrice: '2,000원',
    quantity: '수량 4개',
    totalPrice: '26,000원',
    imageSrc: '/images/coke-zero.png',
  },
];

const REQUEST_MESSAGE =
  '제로콜라 맛있긴 한데 먹으면 배가 아픈 느낌? 그래도 인기 많으니까 주문하는데 음... 조금 더 달게 해주실 순 없나요? 설탕 넣은 것처럼';

export default function RequestCompleteContent() {
  return (
    <div className="flex w-full flex-col gap-[30px]">
      <h1 className="w-full text-center text-[30px] font-bold tracking-[-0.75px] text-gray-950 max-sm:text-[24px] max-sm:tracking-[-0.6px]">
        구매 요청이 완료되었습니다.
      </h1>

      <div className="flex w-full flex-col items-center gap-[60px]">
        <div className="flex w-full flex-col gap-10">
          <RequestItemsSection
            itemCount={2}
            items={COMPLETE_ITEMS}
            orderAmount="52,000원"
            shippingFee="3,000원"
            totalAmount="55,000원"
          />
          <RequestMessage value={REQUEST_MESSAGE} readOnly />
        </div>

        <div className="flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Link href="/cart" className="min-w-0 flex-1">
            <Button variant="line" className="w-full">
              장바구니로 돌아가기
            </Button>
          </Link>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1">
            <Button variant="filled" className="w-full">
              요청내역 확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
