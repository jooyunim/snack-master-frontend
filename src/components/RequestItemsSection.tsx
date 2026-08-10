"use client"
import Image from 'next/image';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';
import { useState } from 'react';

export type RequestItem = {
  id: number;
  name: string;
  price: string;
  quantity: string;
  totalPrice: string;
  imageSrc: string;
};

type RequestItemsSectionProps = {
  itemCount: number;
  items: readonly RequestItem[];
  orderAmount: string;
  shippingFee: string;
  totalAmount: string;
  showChevron?: boolean;
  sectionTitle?: string;
  defaultIsOpen?: boolean;
};

export default function RequestItemsSection({
  itemCount,
  items,
  orderAmount,
  shippingFee,
  totalAmount,
  showChevron = false,
  defaultIsOpen = true,
  sectionTitle = '요청 품목',
}: RequestItemsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex items-start gap-1.5 text-[16px] tracking-[-0.4px] text-gray-950">
        <p className="font-bold">{sectionTitle}</p>
        <p>총 {itemCount}개</p>
        {showChevron ? (
          <button className="relative size-5 shrink-0 overflow-hidden"
            onClick={() => setIsOpen((prev) => !prev)}>
            <Image
              src={icChevronUp}
              alt=""
              fill
              className={`object-contain transition-transform max-lg:-scale-x-100 ${isOpen ? '' : 'rotate-180 max-lg:rotate-0'}`}
            />
          </button>
        ) : null}
      </div>
      {isOpen && (<div className="flex w-full flex-col gap-5 rounded-[2px] bg-white px-[60px] py-10 shadow-[0_0_10px_rgba(0,0,0,0.12)] max-lg:px-5 max-lg:pb-[30px] max-lg:pt-5 max-lg:shadow-[0_0_3px_rgba(0,0,0,0.1)] max-sm:gap-5 max-sm:p-0 max-sm:shadow-none">
        <ul className="flex w-full flex-col">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex w-full items-center justify-between gap-5 border-b border-solid border-gray-100 py-5 max-lg:pr-5 max-sm:items-start max-sm:gap-3 max-sm:py-0 max-sm:pb-5 max-sm:pr-0"
            >
              <div className="flex min-w-0 flex-1 items-center gap-5 max-sm:items-start max-sm:gap-3">
                <div className="relative flex size-[140px] shrink-0 items-center justify-center bg-white shadow-[4px_4px_10px_rgba(250,247,243,0.25)] max-sm:size-[72px] max-sm:rounded-[2px] max-sm:bg-gray-50 max-sm:p-6 max-sm:shadow-none">
                  <div className="relative h-[102px] w-[59px] max-sm:h-[50px] max-sm:w-[29px]">
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-[30px] text-[16px] max-sm:gap-3 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                  <div className="flex flex-col gap-2.5 tracking-[-0.4px] text-gray-900 max-sm:gap-1 max-sm:text-gray-950">
                    <p>{item.name}</p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                  <p className="font-bold text-gray-500 max-sm:hidden">
                    {item.quantity}
                  </p>
                  <div className="hidden w-full items-center justify-between max-sm:flex">
                    <p className="text-[13px] tracking-[-0.325px] text-gray-500">
                      {item.quantity}
                    </p>
                    <p className="text-center text-[16px] font-extrabold tracking-[-0.4px] text-gray-700">
                      {item.totalPrice}
                    </p>
                  </div>
                </div>
              </div>

              <p className="shrink-0 text-center text-[20px] font-extrabold leading-8 text-gray-700 max-sm:hidden">
                {item.totalPrice}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex w-full flex-col gap-2.5 max-lg:px-5 max-sm:gap-4 max-sm:px-0">
          <div className="flex w-full items-center justify-between text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
            <p>주문금액</p>
            <p>{orderAmount}</p>
          </div>
          <div className="flex w-full items-center justify-between text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
            <p>배송비</p>
            <p>{shippingFee}</p>
          </div>
          <div className="flex w-full items-center justify-between text-gray-950">
            <p className="text-[18px] font-bold tracking-[-0.45px]">
              총 주문금액
            </p>
            <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[18px] max-sm:tracking-[-0.45px]">
              {totalAmount}
            </p>
          </div>
        </div>
      </div>)}

    </section>
  );
}