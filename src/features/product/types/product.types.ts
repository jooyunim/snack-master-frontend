export type ProductSort = 'recent' | 'sales' | 'priceAsc' | 'priceDesc';

export type Product = {
  id: number;
  categoryId: number;
  creatorId: string;
  companyId: number;
  name: string;
  price: number;
  filename: string;
  linkUrl: string;
  totalSold: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  imageUrl: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type CategoryWithChildren = Category & {
  children: Category[];
};

export type ProductDetail = Product & {
  category: Category;
};

export type CursorPage<T> = {
  items: T[];
  nextCursor: string | null;
  hasNext: boolean;
  totalCount: number;
};

export type ListProductsParams = {
  categoryId?: number;
  search?: string;
  sort?: ProductSort;
  cursor?: string;
  limit?: number;
};

export type CreateProductInput = {
  name: string;
  price: number;
  categoryId: number;
  linkUrl: string;
  s3Key: string;
  filename: string;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export type ImageUploadUrlResponse = {
  uploadUrl: string;
  s3Key: string;
};
