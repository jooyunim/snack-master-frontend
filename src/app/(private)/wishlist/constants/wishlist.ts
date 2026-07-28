import {
  PRODUCTS,
  type Product,
} from '@/app/(private)/products/constants/products';

/** Figma 찜목록 화면 mock — 상품 리스트 중 찜한 항목 */
export const WISHLIST_PRODUCTS: Product[] = PRODUCTS.slice(0, 6);
