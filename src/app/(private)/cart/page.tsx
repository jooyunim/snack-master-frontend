import Image from 'next/image';
import Link from 'next/link';
import icCheckboxActive from '@/assets/icons/Property 1=active.svg';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import Button from '@/components/Button';
import CartStepIndicator from './components/CartStepIndicator';

const CART_ITEMS = [
  {
    id: 1,
    name: '코카콜라 제로',
    unitPrice: '2,000원',
    quantity: 16,
    totalPrice: '총 26,000원',
    shipping: '택배 배송비 3,000원',
    shippingMobile: '택배 3,000원',
    imageSrc: '/images/coke-zero.png',
  },
  {
    id: 2,
    name: '코카콜라 제로',
    unitPrice: '2,000원',
    quantity: 16,
    totalPrice: '총 26,000원',
    shipping: '택배 배송비 3,000원',
    shippingMobile: '택배 3,000원',
    imageSrc: '/images/coke-zero.png',
  },
] as const;

function CheckboxIcon() {
  return (
    <span className="relative size-6 shrink-0 overflow-hidden max-sm:size-5">
      <Image src={icCheckboxActive} alt="" fill className="object-contain" />
    </span>
  );
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[70px] px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:gap-10">
        <CartStepIndicator flow="request" currentStep={1} />

        <section className="flex w-full flex-col gap-5 rounded-[2px] bg-white px-[50px] py-10 shadow-[0_0_10px_rgba(0,0,0,0.12)] max-lg:p-5 max-sm:gap-0 max-sm:p-0 max-sm:shadow-none">
          <div className="flex w-full items-center justify-between max-lg:px-5 max-sm:px-0">
            <div className="flex h-10 items-center gap-2.5">
              <CheckboxIcon />
              <p className="text-[18px] font-bold tracking-[-0.45px] text-black max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                전체 선택 (2개)
              </p>
            </div>
            <p className="text-[16px] tracking-[-0.4px] text-gray-600 underline max-sm:text-[14px] max-sm:tracking-[-0.35px]">
              선택 삭제
            </p>
          </div>

          <ul className="flex w-full flex-col">
            {CART_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className={`flex w-full items-center gap-5 py-[30px] max-lg:px-5 max-sm:items-center max-sm:gap-2.5 max-sm:px-0 max-sm:py-5 ${
                  index < CART_ITEMS.length - 1
                    ? 'border-b border-solid border-gray-100'
                    : 'max-sm:border-b max-sm:border-solid max-sm:border-gray-100'
                }`}
              >
                <CheckboxIcon />

                <div className="flex min-w-0 flex-1 items-center gap-5 max-sm:items-start max-sm:gap-3">
                  <div className="relative flex size-[140px] shrink-0 items-center justify-center bg-white shadow-[4px_4px_10px_rgba(250,247,243,0.25)] max-sm:size-[81px] max-sm:rounded-[2px] max-sm:bg-gray-50 max-sm:p-6 max-sm:shadow-none">
                    <div className="relative h-[102px] w-[59px] max-sm:h-[50px] max-sm:w-[29px]">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-5 max-sm:gap-0">
                    <div className="flex w-full items-end gap-10 max-sm:items-center max-sm:gap-0">
                      <div className="flex min-w-0 flex-1 flex-col gap-2 text-[16px] tracking-[-0.4px] text-gray-950 max-sm:gap-1 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                        <p>{item.name}</p>
                        <p className="font-bold max-sm:font-extrabold">
                          {item.unitPrice}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <div className="flex h-10 items-center">
                          <div className="flex h-full w-[72px] items-center justify-end gap-1">
                            <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                              {item.quantity}
                            </span>
                            <span className="relative size-6 shrink-0 overflow-hidden max-sm:size-5">
                              <Image
                                src={icChevronDown}
                                alt=""
                                fill
                                className="object-contain"
                              />
                            </span>
                          </div>
                        </div>
                        <p className="text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-lg:leading-8 max-lg:tracking-normal max-sm:hidden">
                          {item.totalPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full items-start justify-between max-sm:items-center">
                      <p className="text-[14px] tracking-[-0.35px] text-gray-600 max-sm:text-[13px] max-sm:tracking-[-0.325px]">
                        <span className="max-sm:hidden">{item.shipping}</span>
                        <span className="hidden max-sm:inline">
                          {item.shippingMobile}
                        </span>
                      </p>
                      <Button
                        variant="sub"
                        className="w-[99px] max-sm:w-[88px] max-sm:text-[13px] max-sm:tracking-[-0.325px]"
                      >
                        바로 요청
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex w-full items-center gap-[60px] max-lg:gap-10 max-sm:flex-col max-sm:gap-[30px]">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3.5 max-sm:w-full">
            <div className="flex w-full items-center gap-1 text-center text-[30px] tracking-[-0.75px] text-gray-950 max-sm:text-[24px] max-sm:tracking-[-0.6px]">
              <p className="font-bold">총 주문금액</p>
              <p className="font-extrabold">55,000원</p>
            </div>
            <div className="flex w-full flex-col gap-1.5 pb-2.5 text-[16px] tracking-[-0.4px] text-gray-600 max-sm:pb-1.5">
              <p>주문 상품은 52,000원</p>
              <p>배송비는 3,000원입니다.</p>
            </div>
          </div>

          <div className="flex w-[300px] shrink-0 flex-col items-end justify-center gap-5 max-sm:w-full">
            <Button variant="line" className="w-full">
              계속 쇼핑하기
            </Button>
            <Link href="/cart/order" className="w-full">
              <Button variant="filled" className="w-full">
                구매 요청
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
