import { Schema, Types } from "mongoose";

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
        minlength: 10,
        maxlength: 100,
      },
      addressLine1: {
        type: String,
        trim: true,
        minlength: 10,
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
      alternatePhone: {
        type: String,
        trim: true,
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
    },
    { timestamps: withTimestamps, _id: withId },
  );

  return addressSchema;
};

export const createObjectId = (id: string) => new Types.ObjectId(id);
