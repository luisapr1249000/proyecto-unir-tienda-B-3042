import { z } from "zod";
import { productSchema } from "../product-schemas/product.validation";
import { abstractSchema } from "../abstract.validation";

export const userCartArray = z.object({ cart: z.array(productSchema) });
export const userWishlistArray = z.object({ wishlist: z.array(productSchema) });
export const userCartSchema = abstractSchema()
  .omit({ updatedAt: true, createdAt: true })
  .merge(userCartArray);

export const userWishlistSchema = abstractSchema()
  .omit({ updatedAt: true, createdAt: true })
  .merge(userWishlistArray);
