import { z } from 'zod';
import { REQUEST_MESSAGE_MAX_LENGTH } from '../types/cart.type';

export const cartSchema = z.object({
  cartItem: z.array(
    z.object({
      id: z.number(),
      quantity: z.number(),
      productName: z.string(),
      price: z.number(),
      imageUrl: z.string(),
    })
  ),
  shippingFee: z.number(),
  budget: z.number(),
});

export type Cart = z.infer<typeof cartSchema>;
export type CartItem = Cart['cartItem'][number];

export const cartQuerySchema = z.object({
  data: cartSchema,
});

export type CartQuery = z.infer<typeof cartQuerySchema>;

export const addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export type AddToCart = z.infer<typeof addToCartSchema>;

//요청메세지
export const requestMessageSchema = z.object({
  requestMessage: z
    .string({ error: '요청 메시지를 입력해주세요.' })
    .trim()
    .min(1, '요청 메시지를 입력해주세요.')
    .max(
      REQUEST_MESSAGE_MAX_LENGTH,
      `요청 메시지는 ${REQUEST_MESSAGE_MAX_LENGTH}자 이하여야 합니다.`
    ),
});

export type RequestMessage = z.infer<typeof requestMessageSchema>;
