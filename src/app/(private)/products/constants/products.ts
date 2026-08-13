export type Product = {
  id: number;
  name: string;
  price: number;
  purchaseCount: number;
  categorySlug: string;
  subSlug?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: '코카콜라',
    price: 2000,
    purchaseCount: 29,
    categorySlug: 'drink',
    subSlug: 'soda',
  },
  {
    id: 2,
    name: '코카콜라 제로',
    price: 2000,
    purchaseCount: 29,
    categorySlug: 'drink',
    subSlug: 'soda',
  },
  {
    id: 3,
    name: '스프라이트',
    price: 2000,
    purchaseCount: 29,
    categorySlug: 'drink',
    subSlug: 'soda',
  },
  {
    id: 4,
    name: '환타 오렌지',
    price: 2400,
    purchaseCount: 29,
    categorySlug: 'drink',
    subSlug: 'soda',
  },
  {
    id: 5,
    name: '코카콜라',
    price: 2000,
    purchaseCount: 29,
    categorySlug: 'drink',
    subSlug: 'soda',
  },
  {
    id: 6,
    name: '코카콜라 제로',
    price: 2000,
    purchaseCount: 29,
    categorySlug: 'drink',
    subSlug: 'soda',
  },
  {
    id: 7,
    name: '델몬트 오렌지',
    price: 1800,
    purchaseCount: 12,
    categorySlug: 'drink',
    subSlug: 'juice',
  },
  {
    id: 8,
    name: '레드불',
    price: 2500,
    purchaseCount: 18,
    categorySlug: 'drink',
    subSlug: 'energy',
  },
  {
    id: 9,
    name: '새우깡',
    price: 1500,
    purchaseCount: 40,
    categorySlug: 'snack',
  },
  {
    id: 10,
    name: '삼다수 2L',
    price: 1200,
    purchaseCount: 55,
    categorySlug: 'water',
  },
];

export function filterProducts(
  categorySlug?: string,
  subSlug?: string,
): Product[] {
  if (!categorySlug) return PRODUCTS;

  return PRODUCTS.filter((product) => {
    if (product.categorySlug !== categorySlug) return false;
    if (subSlug) return product.subSlug === subSlug;
    return true;
  });
}

export function getProductById(id: number) {
  return PRODUCTS.find((product) => product.id === id);
}
