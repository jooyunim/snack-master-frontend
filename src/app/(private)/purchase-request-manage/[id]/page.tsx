import Button from '@/components/Button';
import RequestItemsSection, {
  type RequestItem,
} from '@/app/(private)/cart/components/RequestItemsSection';
import InfoSection from '@/app/(private)/purchase-request/[id]/components/InfoSection';

const DETAIL_ITEMS: readonly RequestItem[] = [
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

export default function PurchaseRequestManageDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px] max-sm:pb-[136px]">
        <h1 className="w-full text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          구매 요청 상세
        </h1>

        <RequestItemsSection
          itemCount={2}
          items={DETAIL_ITEMS}
          orderAmount="52,000원"
          shippingFee="3,000원"
          totalAmount="55,000원"
          showChevron
        />

        <InfoSection
          title="요청 정보"
          rows={[
            {
              type: 'pair',
              left: { label: '요청인', value: '김스낵' },
              right: { label: '요청 날짜', value: '2025.06.03' },
            },
            {
              type: 'single',
              field: {
                label: '요청 메시지',
                value:
                  '제로콜라 맛있긴 한데 먹으면 배가 아픈 느낌? 그래도 인기 많으니까 주문하는데 음... 조금 더 달게 해주실 순 없나요? 설탕 넣은 것처럼',
              },
            },
          ]}
        />

        <InfoSection
          title="예산 정보"
          rows={[
            {
              type: 'single',
              field: { label: '이번 달 지출액', value: '1,500,000원' },
            },
            {
              type: 'single',
              field: { label: '이번 달 남은 예산', value: '3,500,000원' },
            },
            {
              type: 'single',
              field: { label: '구매 후 예산', value: '1,460,000원' },
            },
          ]}
        />

        <div className="mx-auto flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button variant="line" className="min-w-0 flex-1">
            요청 반려
          </Button>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink">
            <Button variant="filled" className="w-full">
              요청 승인
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
