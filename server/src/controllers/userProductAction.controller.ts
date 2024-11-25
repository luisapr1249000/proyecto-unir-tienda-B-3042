import { User } from "../models/user.model";
import { Request, Response } from "express";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
  isArrayEmptyOrUndefined,
} from "../utils/error.utils";
import { Product } from "../models/product.model";
import { createObjectId } from "../utils/product.utils";

class UserProductActions {
  public async getUserCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).select("cart").populate("cart");
      if (!user) return handleObjectNotFound(res, "User");

      if (isArrayEmptyOrUndefined(user?.cart))
        return handleObjectNotFound(res, "Cart");

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUseSavedProducts(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId)
        .select("savedProducts")
        .populate("savedProducts");
      if (!user) return handleObjectNotFound(res, "User");

      if (isArrayEmptyOrUndefined(user?.savedProducts))
        return handleObjectNotFound(res, "Saved Products");

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUseWishlist(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId)
        .select("wishlist")
        .populate("wishlist");
      if (!user) return handleObjectNotFound(res, "User");

      if (isArrayEmptyOrUndefined(user?.wishlist))
        return handleObjectNotFound(res, "Wishlist");

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async toggleProductWishlist(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return handleObjectNotFound(res, "Product");
      }

      const user = await User.findById(userId).select("wishlist");
      if (!user) return handleObjectNotFound(res, "User");

      const productExisted = user.wishlist.includes(createObjectId(productId));
      if (productExisted) {
        user.wishlist.pull(productId);
        product.wishlistCount -= 1;
      } else {
        user.wishlist?.push(productId);
        product.wishlistCount += 1;
      }
      const productSaved = await product.save();
      const userSaved = await user.save();
      if (!userSaved || !productSaved) return handleBadSaved(res);

      return res.status(200).json(userSaved);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async toggleProductCart(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product");

      const user = await User.findById(userId).select("wishlist");
      if (!user) return handleObjectNotFound(res, "User");

      const productExisted = user.wishlist.includes(createObjectId(productId));
      if (productExisted) {
        user.cart.pull(productId);
      } else {
        user.cart?.push(productId);
      }
      const userSaved = await user.save();
      if (!userSaved) return handleBadSaved(res);

      return res.status(200).json(userSaved);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async toggleSavedProducts(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product");

      const user = await User.findById(userId).select("wishlist");
      if (!user) return handleObjectNotFound(res, "User");

      const productExisted = user.wishlist.includes(createObjectId(productId));
      if (productExisted) user.savedProducts.pull(productId);
      else user.savedProducts?.push(productId);

      const userSaved = await user.save();
      if (!userSaved) return handleBadSaved(res);

      return res.status(200).json(userSaved);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new UserProductActions();
