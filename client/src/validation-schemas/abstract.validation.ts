import { z } from "zod";

export const abstractSchema = z.object({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const basicString = z.string().trim().min(1);
export const emailString = z.string().trim().email().min(1).toLowerCase();
export const authorFieldSchema = z.object({
  author: z.string().trim().min(24),
});
export const productFieldSchema = z.object({
  product: z.string().trim().min(24),
});
export const categoryFieldSchema = z.object({
  product: z.string().trim().min(24),
});
export const AlphanumericAndDotsRegex = /^[a-zA-Z0-9.]+$/;
