import Image from 'next/image';
import Button from '@/components/Button';

type ApprovalItem = {
  id: number;
  name: string;
  unitPrice: string;
  quantity: string;
  totalPrice: string;
  imageSrc: string;
};

const DUMMY_ITEMS: readonly ApprovalItem[] = [
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

export default function PurchaseRequestApprovalModal() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-request-approval-title"
      className="flex w-[600px] flex-col items-center gap-8 rounded-[2px] bg-white px-[60px] py-10 shadow-[0_0_20px_rgba(0,0,0,0.1)] max-sm:w-full max-sm:gap-0 max-sm:px-0 max-sm:py-0 max-sm:shadow-none"
    >
      <h2
        id="purchase-request-approval-title"
        className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:px-2 max-sm:py-4"
      >
        구매 요청 승인
      </h2>

      <div className="flex w-full flex-col gap-9 max-sm:gap-8 max-sm:px-6 max-sm:pb-[112px]">
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col gap-8 pb-5">
            <div className="flex items-center gap-3">
              <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                <span className="text-[10px] font-medium tracking-[-0.25px] text-black">
                  JN
                </span>
              </div>
              <p className="w-16 text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                김스낵
              </p>
            </div>

            <div className="flex items-center gap-1.5 tracking-[-0.4px] text-gray-950">
              <p className="text-[16px] font-bold">요청 품목</p>
              <p className="text-[16px] max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                총 2개
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-8">
            <div className="flex w-full flex-col gap-5 rounded-[2px] bg-white px-5 pb-[30px] pt-5 shadow-[0_0_5px_rgba(0,0,0,0.12)]">
              <ul className="flex w-full flex-col">
                {DUMMY_ITEMS.map((item) => (
                  <li
                    key={item.id}
                    className="flex w-full items-center justify-between border-b border-solid border-gray-100 py-5 pr-2"
                  >
                    <div className="flex items-center gap-5 max-sm:gap-3">
                      <div className="relative flex size-10 shrink-0 items-center justify-center bg-white shadow-[4px_4px_10px_rgba(250,247,243,0.25)]">
                        <div className="relative h-[35px] w-5">
                          <Image
                            src={item.imageSrc}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5 text-[16px] tracking-[-0.4px] text-gray-900 max-sm:gap-1 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                        <p className="font-medium max-sm:font-normal">
                          {item.name}
                        </p>
                        <p className="font-bold">{item.unitPrice}</p>
                      </div>
                    </div>

                    <p className="text-[16px] font-bold text-gray-500 max-sm:hidden">
                      {item.quantity}
                    </p>

                    <p className="text-center text-[20px] font-extrabold leading-8 text-gray-700 max-sm:hidden">
                      {item.totalPrice}
                    </p>

                    <div className="hidden flex-col items-start justify-center gap-1 max-sm:flex">
                      <p className="text-[13px] font-bold tracking-[-0.325px] text-gray-500">
                        {item.quantity}
                      </p>
                      <p className="text-center text-[16px] font-bold tracking-[-0.4px] text-gray-700">
                        {item.totalPrice}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex w-full flex-col gap-2.5">
                <div className="flex w-full items-center justify-between px-2 text-[16px] font-bold tracking-[-0.4px] text-gray-700">
                  <p>주문금액</p>
                  <p>52,000원</p>
                </div>
                <div className="flex w-full items-center justify-between px-2 text-[16px] font-bold tracking-[-0.4px] text-gray-700">
                  <p>배송비</p>
                  <p>3,000원</p>
                </div>
                <div className="flex w-full items-center justify-between px-2 text-gray-950">
                  <p className="text-[18px] font-bold tracking-[-0.45px] max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                    총 주문금액
                  </p>
                  <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[20px] max-sm:tracking-[-0.5px]">
                    55,000원
                  </p>
                </div>
              </div>
            </div>

            <hr className="w-full border-0 border-t border-solid border-gray-100" />

            <div className="flex w-full items-center justify-between text-gray-950">
              <p className="text-[18px] font-bold tracking-[-0.45px] max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                남은 예산 금액
              </p>
              <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[20px] max-sm:tracking-[-0.5px]">
                60,000원
              </p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                승인 메시지
              </p>
              <textarea
                placeholder="승인 메시지를 입력해주세요"
                className="h-[140px] w-full resize-none rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-950 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:bg-white max-sm:p-6">
          <Button variant="line" className="min-w-0 flex-1">
            취소
          </Button>
          <Button variant="filled" className="min-w-0 flex-1">
            승인하기
          </Button>
        </div>
      </div>
    </div>
  );
}
