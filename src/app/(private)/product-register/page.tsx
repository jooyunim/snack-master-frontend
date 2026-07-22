import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';

type RegisteredProduct = {
  id: number;
  name: string;
  registeredAt: string;
  category: string;
  price: string;
  link: string;
};

const PRODUCTS: RegisteredProduct[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: '코카콜라 제로',
  registeredAt: '2024. 07. 04',
  category: '청량・탄산음료',
  price: '1,900',
  link: 'www.codeit.kr',
}));

export default function ProductRegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-[18px] px-6 pb-20 pt-20 max-lg:gap-5 max-lg:pt-10 max-sm:pt-5">
        <div className="relative flex w-full items-center justify-between max-lg:border-b max-lg:border-solid max-lg:border-gray-100 max-lg:pb-5 max-lg:pt-2.5">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-gray-950">
            상품 등록 내역
          </h1>
          <SortDropdown />
        </div>

        <div className="flex w-full flex-col items-end gap-[30px] max-sm:gap-5">
          {/* PC table */}
          <div className="flex w-full flex-col max-lg:hidden">
            <div className="flex w-full items-center justify-between border-y border-solid border-gray-100 px-10 py-5">
              <div className="flex shrink-0 items-center pl-[60px]">
                <span className="w-[260px] text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                  상품명
                </span>
              </div>
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                등록일
              </span>
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                카테고리
              </span>
              <span className="w-[160px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                가격
              </span>
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                제품 링크
              </span>
            </div>

            <ul className="flex w-full flex-col">
              {PRODUCTS.map((product) => (
                <li
                  key={product.id}
                  className="flex h-[100px] w-full items-center justify-between border-b border-solid border-gray-100 px-10"
                >
                  <div className="flex shrink-0 items-center gap-5">
                    <div className="size-10 shrink-0 overflow-hidden rounded-[2px] bg-gray-25" />
                    <span className="w-[260px] text-[16px] tracking-[-0.4px] text-gray-950">
                      {product.name}
                    </span>
                  </div>
                  <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                    {product.registeredAt}
                  </span>
                  <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                    {product.category}
                  </span>
                  <span className="w-[160px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                    {product.price}
                  </span>
                  <span
                    className="w-[180px] shrink-0 truncate text-[16px] tracking-[-0.4px] text-gray-950"
                    title={product.link}
                  >
                    {product.link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tablet / Mobile card list */}
          <div className="hidden w-full flex-col max-lg:flex max-sm:gap-2.5">
            <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
              총 등록한 상품 15개
            </p>
            <ul className="flex w-full flex-col">
              {PRODUCTS.map((product) => (
                <li
                  key={product.id}
                  className="flex h-[180px] w-full flex-col gap-2.5 border-b border-solid border-gray-100 py-[30px] max-sm:h-auto max-sm:pb-[30px] max-sm:pt-5"
                >
                  <p className="text-[16px] font-extrabold tracking-[-0.4px] text-gray-950">
                    {product.registeredAt}
                  </p>
                  <div className="flex w-full items-center gap-5">
                    <div className="size-[90px] shrink-0 overflow-hidden rounded-[2px] bg-gray-50" />
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                      <div className="flex flex-col gap-1 max-sm:gap-1.5">
                        <p className="text-[12px] tracking-[-0.3px] text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                          {product.name}
                        </p>
                        <p className="text-[14px] font-extrabold tracking-[-0.35px] text-gray-950">
                          {product.price}원
                        </p>
                      </div>
                      <p
                        className="w-[180px] truncate text-[14px] tracking-[-0.35px] text-gray-600"
                        title={product.link}
                      >
                        {product.link}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Pagination />
        </div>
      </main>
    </div>
  );
}
