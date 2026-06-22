import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  address: z.string().min(3).max(300),
  deliveryNotes: z.string().max(500).optional(),
  notes: z.string().max(500).optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(100),
      })
    )
    .min(1),
});

export const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  message: z.string().min(2).max(1000),
  productId: z.string().optional(),
});

export const productSchema = z.object({
  code: z.string().min(2).max(30),
  name: z.string().min(2).max(150),
  description: z.string().min(2).max(3000),
  price: z.number().positive(),
  size: z.string().max(100).optional(),
  quantity: z.number().int().min(0),
  images: z.array(z.string()).default([]),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  categoryId: z.string().min(1),
});
