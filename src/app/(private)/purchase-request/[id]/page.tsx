import Button from '@/components/Button';
import RequestItemsSection, {
  type RequestItem,
} from '@/components/RequestItemsSection';
import InfoSection from '../../../../components/InfoSection';

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

export default function PurchaseRequestDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px] max-sm:pb-[136px]">
        <h1 className="w-full text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          구매 요청 내역
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
          title="승인 정보"
          rows={[
            {
              type: 'pair',
              left: { label: '담당자', value: '김코디' },
              right: { label: '승인 날짜', value: '2025.06.14' },
            },
            {
              type: 'pair',
              left: { label: '상태', value: '구매 반려' },
              right: {
                label: '결과 메시지',
                value: '제로콜라에 설탕 넣은 콜라로 주문하시면 됩니다.',
              },
            },
          ]}
        />

        <div className="mx-auto flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button variant="line" className="min-w-0 flex-1">
            목록 보기
          </Button>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink">
            <Button variant="filled" className="w-full">
              <span className="max-sm:hidden">장바구니에 다시 담기</span>
              <span className="hidden max-sm:inline">장바구니 다시 담기</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
