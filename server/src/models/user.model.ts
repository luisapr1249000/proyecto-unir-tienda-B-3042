import bcrypt from "bcrypt";
import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { UserDocument } from "../types/user";
import { createAddressSchema } from "../utils/mongoose-schemas/mongoose.utils";

export const imageSchema = new Schema({
  originalName: String,
  url: String,
  contentType: String,
  size: String,
  createdAt: { type: Date, default: Date.now },
});

const cartItem = new Schema(
  {
    quantity: {
      type: Number,
      min: [1, "Quantity cannot be less than 1"],
      default: 1,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      unique: true,
    },
    price: Number,
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

const userCartSchema = new Schema(
  {
    items: [cartItem],
    totalPrice: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
  },
  { _id: false },
);

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
    cart: {
      type: userCartSchema,
      default: { items: [], totalPrice: 0, totalItems: 0 },
      select: false,
    },
    isSeller: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      select: false,
    },
    addressDirections: {
      type: [createAddressSchema({ withTimestamps: true })],
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

userSchema.methods.comparePasswords = function (
  candidatePassword: string,
): boolean {
  return this.password
    ? bcrypt.compareSync(candidatePassword, this.password)
    : false;
};

userSchema.methods.hashPassword = function (password: string): string {
  return bcrypt.hashSync(password, 10);
};
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
