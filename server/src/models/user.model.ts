import bcrypt from "bcrypt";
import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { UserDocument } from "../types/user";

const addressDirectionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 100,
    },
    addressLine1: {
      type: String,
      required: true,
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
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work"],
    },
  },
  { timestamps: true, _id: false },
);

export const imageSchema = new Schema({
  originalName: String,
  url: String,
  contentType: String,
  size: String,
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    hasConfirmedEmail: { type: Boolean, default: false },
    firstName: String,
    lastName: String,
    bio: String,
    phoneNumber: Number,
    avatar: imageSchema,
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    savedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        select: false,
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        select: false,
      },
    ],
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        select: false,
      },
    ],
    isSeller: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    addressDirections: {
      type: addressDirectionSchema,
      select: false,
    },
    googleId: String,
  },
  {
    timestamps: true,
    methods: {
      comparePasswords(candidatePassword: string): boolean {
        return bcrypt.compareSync(candidatePassword, this.password ?? "");
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  if (this.password) this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.plugin(mongoosePaginate);
export const User = model<UserDocument, PaginateModel<UserDocument>>(
  "User",
  userSchema,
);

export const ImageModel = model("Image", imageSchema);
