import { z } from "zod";
import {
  addressDirection,
  addressDirectionInputSchema,
  userInputSchema,
  userSchema,
} from "../validation-schemas/user-schemas/user.validation";
import {
  userCartSchema,
  userSavedProductsSchema,
  userWishlistSchema,
} from "../validation-schemas/user-schemas/user.product.actions.validation";

export type User = z.infer<typeof userSchema>;
export type UserInput = z.infer<typeof userInputSchema>;
export type UserId = { userId: string };

export type AddressDirection = z.infer<typeof addressDirection>;
export type AddressDirectionInput = z.infer<typeof addressDirectionInputSchema>;

export type UserCart = z.infer<typeof userCartSchema>;
export type UserWishlist = z.infer<typeof userWishlistSchema>;
export type UserSavedProducts = z.infer<typeof userSavedProductsSchema>;

export type UserProp = { user: User };
