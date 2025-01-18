import { z } from "zod";
import {
  userInputSchema,
  userSchema,
} from "../validation-schemas/user-schemas/user.validation";
import {
  cartItem,
  userCartSchema,
  userSavedProductsSchema,
  userWishlistSchema,
} from "../validation-schemas/user-schemas/user.product.actions.validation";
import {
  addressDirection,
  addressDirectionInputSchema,
} from "../validation-schemas/user-schemas/userAddressDirection.validation";

export type User = z.infer<typeof userSchema>;
export type UserInput = z.infer<typeof userInputSchema>;
export type UserId = { userId: string };

export type AddressDirection = z.infer<typeof addressDirection>;
export type addressDirectionId = { addressDirectionId: string };
export type AddressDirectionInput = z.infer<typeof addressDirectionInputSchema>;

export type UserCartItem = z.infer<typeof cartItem>;
export type UserCart = z.infer<typeof userCartSchema>;
export type UserWishlist = z.infer<typeof userWishlistSchema>;
export type UserSavedProducts = z.infer<typeof userSavedProductsSchema>;

export type UserProp = { user: User };
