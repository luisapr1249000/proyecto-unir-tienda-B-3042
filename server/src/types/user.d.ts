/* eslint-disable no-unused-vars */
import { Document, PaginateModel, Types } from "mongoose";
import {
  cartItem,
  userInputSchema,
  userSchemaComplete,
} from "../validation-schemas/user-schemas/user.validation";
import { z } from "zod";
import { AddressDirection } from "./addressDirectionSchema";

export type UserCartItem = z.infer<typeof cartItem>;
export type UserCart = {
  totalPrice: number;
  items: Types.DocumentArray<UserCartItem>;
};
export type UserInput = z.infer<typeof userInputSchema>;
export type User = z.infer<typeof userSchemaComplete> & {
  cart: UserCart;
  savedProducts: Types.Array<Types.ObjectId>;
  wishlist: Types.Array<Types.ObjectId>;
  addressDirections: Types.DocumentArray<AddressDirection>;
};
export type UserDocument = Document &
  User & {
    comparePasswords: (
      candidatePassword: string,
      currentPassword?: string,
    ) => boolean;
    hashPassword: (newPassword: string) => string;
  };

export type UserPagination = PaginateModel<UserDocument>;
