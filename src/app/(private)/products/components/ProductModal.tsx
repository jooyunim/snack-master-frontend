'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CategoryDropdown, {
  type CategoryOption,
} from '@/app/(private)/products/components/CategoryDropdown';
import iconPhoto from '@/assets/icons/icon_photo.svg';
import { useCategories } from '@/features/product/hooks/useCategories';
import { useProductMutations } from '@/features/product/hooks/useProductMutations';
import type { ProductDetail } from '@/features/product/types/product.types';

type ProductModalProps = {
  /** 있으면 수정 모드, 없으면 등록 모드 */
  product?: ProductDetail;
  onClose: () => void;
};

const PRODUCT_NAME_MAX_LENGTH = 100;
const PRODUCT_PRICE_MAX = 1_000_000_000;

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const isEditMode = Boolean(product);
  const { data: categories } = useCategories();
  const { createMutation, updateMutation } = useProductMutations();

  const initialParent = useMemo(() => {
    if (!product || !categories) return null;
    const parent = categories.find((category) =>
      category.children.some((child) => child.id === product.categoryId)
    );
    return parent ? { id: parent.id, name: parent.name } : null;
  }, [product, categories]);

  const [parentCategory, setParentCategory] = useState<CategoryOption | null>(
    initialParent
  );
  const [subCategory, setSubCategory] = useState<CategoryOption | null>(
    product ? { id: product.categoryId, name: product.category.name } : null
  );
  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [linkUrl, setLinkUrl] = useState(product?.linkUrl ?? '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.imageUrl ?? null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subOptions = parentCategory
    ? (categories?.find((category) => category.id === parentCategory.id)
        ?.children ?? [])
    : [];

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    setErrorMessage(null);

    const trimmedName = name.trim();
    const parsedPrice = Number(price);

    if (!trimmedName || trimmedName.length > PRODUCT_NAME_MAX_LENGTH) {
      return setErrorMessage(
        `상품명은 ${PRODUCT_NAME_MAX_LENGTH}자 이하여야 합니다.`
      );
    }
    if (
      !price ||
      !Number.isInteger(parsedPrice) ||
      parsedPrice <= 0 ||
      parsedPrice > PRODUCT_PRICE_MAX
    ) {
      return setErrorMessage('가격을 올바르게 입력해주세요.');
    }
    if (!subCategory) return setErrorMessage('카테고리를 선택해주세요.');
    if (!linkUrl.trim()) return setErrorMessage('제품 링크를 입력해주세요.');
    if (!isEditMode && !imageFile) {
      return setErrorMessage('상품 이미지를 업로드해주세요.');
    }

    try {
      if (isEditMode && product) {
        await updateMutation.mutateAsync({
          id: product.id,
          name: trimmedName,
          price: parsedPrice,
          categoryId: subCategory.id,
          linkUrl: linkUrl.trim(),
          ...(imageFile ? { imageFile } : {}),
        });
      } else if (imageFile) {
        await createMutation.mutateAsync({
          name: trimmedName,
          price: parsedPrice,
          categoryId: subCategory.id,
          linkUrl: linkUrl.trim(),
          imageFile,
        });
      }
      onClose();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '요청 처리 중 오류가 발생했습니다.'
      );
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-register-title"
      className="flex w-[512px] flex-col items-center gap-9 rounded-[6px] bg-white p-[30px] shadow-[0_0_15px_rgba(0,0,0,0.14)] max-sm:w-full max-sm:gap-0 max-sm:rounded-none max-sm:p-0 max-sm:shadow-none"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
        className="contents"
      >
        <div className="flex w-full flex-col items-center gap-[30px] max-sm:gap-5 max-sm:px-6 max-sm:pb-[112px]">
          <h2
            id="product-register-title"
            className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:mb-2.5 max-sm:flex max-sm:h-11 max-sm:w-[calc(100%+3rem)] max-sm:-mx-6 max-sm:shrink-0 max-sm:items-center max-sm:justify-center max-sm:p-2"
          >
            {isEditMode ? '상품 수정' : '상품 등록'}
          </h2>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            aria-label="상품 이미지 업로드"
            onClick={handleImageClick}
            className="relative flex size-[140px] shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-solid border-gray-200 bg-white max-sm:mb-2.5"
          >
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <span className="relative size-[30px] shrink-0 overflow-hidden">
                <Image src={iconPhoto} alt="" fill className="object-contain" />
              </span>
            )}
          </button>

          <div className="flex w-full items-start gap-5">
            <CategoryDropdown
              placeholder="대분류"
              value={parentCategory}
              options={
                categories?.map((category) => ({
                  id: category.id,
                  name: category.name,
                })) ?? []
              }
              onChange={(option) => {
                setParentCategory(option);
                setSubCategory(null);
              }}
            />

            <CategoryDropdown
              placeholder="소분류"
              value={subCategory}
              options={subOptions}
              disabled={!parentCategory}
              onChange={setSubCategory}
            />
          </div>

          <Input
            placeholder="상품명을 입력해주세요"
            value={name}
            maxLength={PRODUCT_NAME_MAX_LENGTH}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            type="number"
            placeholder="가격을 입력해주세요"
            value={price}
            min={1}
            max={PRODUCT_PRICE_MAX}
            step={1}
            onChange={(event) => setPrice(event.target.value)}
          />
          <Input
            placeholder="제품 링크를 입력해주세요"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
          />

          {errorMessage ? (
            <p className="w-full text-[14px] tracking-[-0.35px] text-error-500">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="flex w-full items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:bg-white max-sm:p-6">
          <Button
            type="button"
            variant="line"
            onClick={onClose}
            className="min-w-0 flex-1"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="filled"
            disabled={isSubmitting}
            className="min-w-0 flex-1"
          >
            {isSubmitting ? '처리 중...' : isEditMode ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
