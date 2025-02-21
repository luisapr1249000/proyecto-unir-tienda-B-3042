import { Schema, Types } from "mongoose";
import { User } from "../../models/user.model";

export const createAddressSchema = ({
  withTimestamps = false,
  withId = true,
} = {}) => {
  const addressSchema = new Schema(
    {
      pinCode: {
        type: String,
        trim: true,
      },
      locality: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      addressLine1: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      addressLine2: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      cityDistrictTown: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        trim: true,
      },
      addressType: {
        type: String,
        required: true,
        enum: ["home", "work"],
      },
      mobilePhone: String,
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: withTimestamps, _id: withId },
  );

  return addressSchema;
};

export const createObjectId = (id: string) => new Types.ObjectId(id);

export const createAdmin = async () => {
  const user = new User({
    username: "admin",
    email: "admin@admin.com",
    password: "admin",
    role: "admin",
  });
  await user.save();
  console.table({ user: user.toJSON() });
};
