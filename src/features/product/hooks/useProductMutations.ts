import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productKeys } from '../constants/query-keys';
import {
  createProduct,
  deleteProduct,
  getProductImageUploadUrl,
  updateProduct,
  uploadProductImage,
} from '../services/product.api';
import type { CreateProductInput, UpdateProductInput } from '../types/product.types';

/** 이미지 파일이 있으면 presigned URL 발급 → S3 업로드까지 처리하고 s3Key/filename을 돌려준다 */
async function resolveImage(file: File) {
  const { uploadUrl, s3Key } = await getProductImageUploadUrl(file.name);
  await uploadProductImage(uploadUrl, file);
  return { s3Key, filename: file.name };
}

export function useProductMutations() {
  const queryClient = useQueryClient();

  const invalidateLists = () => {
    queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    queryClient.invalidateQueries({ queryKey: productKeys.myLists() });
  };

  const createMutation = useMutation({
    mutationFn: async (
      input: Omit<CreateProductInput, 's3Key' | 'filename'> & { imageFile: File },
    ) => {
      const { s3Key, filename } = await resolveImage(input.imageFile);
      return createProduct({ ...input, s3Key, filename });
    },
    onSuccess: invalidateLists,
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      imageFile,
      ...input
    }: Omit<UpdateProductInput, 's3Key' | 'filename'> & {
      id: number;
      imageFile?: File;
    }) => {
      const image = imageFile ? await resolveImage(imageFile) : {};
      return updateProduct(id, { ...input, ...image });
    },
    onSuccess: (_data, variables) => {
      invalidateLists();
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: invalidateLists,
  });

  return { createMutation, updateMutation, deleteMutation };
}
