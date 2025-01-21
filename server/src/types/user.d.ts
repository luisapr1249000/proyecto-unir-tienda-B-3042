import {
  HydratedDocument,
  InferSchemaType,
  PaginateModel,
  Types,
} from "mongoose";
import { userInputSchema } from "../validation-schemas/user-schemas/user.validation";
import { z } from "zod";
import { userSchema } from "../models/user.model";

export type UserInput = z.infer<typeof userInputSchema>;

interface UserMethods {
  _id: Types.ObjectId;
  comparePasswords: (candidatePassword: string) => boolean;
  hashPassword: (newPassword: string) => string;
}

export type UserType = InferSchemaType<typeof userSchema> & UserMethods;

export interface UserModel extends PaginateModel<UserType> {
  findByUsername: (username: string) => Promise<HydratedDocument<UserType>>;
  findExistingUser: (
    username: string,
    email: string,
  ) => Promise<HydratedDocument<UserType>>;
  findByUsernameOrEmail: (
    loginValue: string,
  ) => Promise<HydratedDocument<UserType>>;
}
