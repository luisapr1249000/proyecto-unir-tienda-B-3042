import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { UserModel, UserType } from "../types/user";
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
    },
    price: { type: Number, min: [1, "Price cannot be less than 1"] },
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

export const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username required"],
      trim: true,
      maxlength: [40, "Username must be less than 40 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email required"],
      trim: true,
      lowercase: true,
      maxlength: [100, "Email must be less than 100 characters"],
    },
    password: {
      type: String,
      select: false,
    },
    hasConfirmedEmail: { type: Boolean, default: false },
    firstName: {
      type: String,
      maxlength: [40, "First name must be less than 40 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: [40, "Last name must be less than 40 characters"],
      trim: true,
    },
    bio: {
      type: String,
      default: "",
      maxlength: [200, "Bio must be less than 200 characters"],
    },
    birthday: { type: Date, default: null },
    mobilePhone: { type: String, maxlength: 15, trim: true, default: "" },
    avatar: imageSchema,
    lastLogin: {
      type: Date,
      default: Date.now(),
    },

    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        select: false,
        default: [],
      },
    ],
    cart: {
      type: userCartSchema,
      default: {},
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
      default: [],
    },
    googleId: String,
  },
  {
    timestamps: true,
    methods: {
      comparePasswords(candidatePassword: string): boolean {
        if (!this.password) return false;
        return bcrypt.compareSync(candidatePassword, this.password ?? "");
      },
      hashPassword(newPassword: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(newPassword, salt);
      },
    },
    statics: {
      findByUsername: async function (username: string) {
        return this.findOne({ username });
      },
      findExistingUser: async function (username: string, email: string) {
        return this.findOne({
          $or: [{ email: email }, { username: username }],
        });
      },
      findByUsernameOrEmail: async function (loginValue: string) {
        return this.findOne({
          $or: [{ email: loginValue }, { username: loginValue }],
        }).select("+password");
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

export const User = model<UserType, UserModel>("User", userSchema);
