import { z } from 'zod';

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
