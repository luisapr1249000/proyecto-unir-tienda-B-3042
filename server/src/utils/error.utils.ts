import { Response } from "express";
import { Types } from "mongoose";
import { ZodError } from "zod";

export const getError = (e: unknown) => {
  if (e instanceof ZodError) return { status: 400, error: e.issues };
  return e instanceof Error
    ? { status: 500, error: e.message }
    : { status: 500, error: "Something Went Bad" };
};

export const handleError = (res: Response, e: unknown) => {
  const { status, error } = getError(e);
  return res.status(status).json({ error });
};

export const handleObjectNotFound = (
  res: Response,
  objectType:
    | "User"
    | "Product"
    | "Comment"
    | "Category"
    | "Address"
    | "Order"
    | "Categories"
    | "Cart"
    | "Saved Products"
    | "Wishlist",
  multipleObjects = false,
  extraMessage = "",
) => {
  const pluralSuffix = multipleObjects ? "s" : "";
  const message = `${objectType}${pluralSuffix} Not Found${extraMessage ? ` ${extraMessage}` : ""}`;

  return res.status(404).json({ message });
};

export const handleNotPermissions = (res: Response) => {
  return res.status(403).json({ message: "Forbidden" });
};

export const handleBadRequest = (res: Response, e: unknown) => {
  const { status, error } = getError(e);
  return res.status(status).json(error);
};

export const isArrayEmptyOrUndefined = (array: Types.ObjectId[]) => {
  return array.length === 0 || !array;
};
