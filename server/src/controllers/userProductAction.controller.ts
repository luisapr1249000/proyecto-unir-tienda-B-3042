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
import { extractAuthUserId } from "../utils/auth.utils";

class UserProductActions {
  public async getUserCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).select("cart").populate("cart");
      if (!user) return handleObjectNotFound(res, "User");

      if (isArrayEmptyOrUndefined(user.cart))
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
  public async addProductToCart(req: Request, res: Response) {
    try {
      const userId = extractAuthUserId(req);
      const { productId } = req.params;
      const { quantity, sellerId, price } = req.body;

      const user = await User.findById(userId);
      console.log(user);
      if (!user) return handleObjectNotFound(res, "User");
      user.cart.items.map((item) => console.log(item));
      // const existedProduct = user.cart.items.findIndex(
      //   (product) => product.productId === productId!,
      // );
      // if (existedProduct === -1) {
      // const cartObj = { quantity, productId, sellerId, price };
      // user.cart.items.push(cartObj);
      // }
      // if (!user.cart.items[existedProduct]) {
      //   return handleObjectNotFound(res, "User");
      // }

      // user.cart.items[existedProduct].quantity = quantity;

      await user.save();

      return res
        .status(200)
        .json({ message: "Product added to cart", cart: user });
    } catch (error) {
      return handleError(res, error);
    }
  }

  public async removeProductFromCart(req: Request, res: Response) {
    try {
      const userId = extractAuthUserId(req);
      const { productId } = req.params;
      const { quantity } = req.body;

      const user = await User.findById(userId).select("cart");
      if (!user) return handleObjectNotFound(res, "User");

      const existedProduct = user.cart.items.findIndex(
        (product) => product.productId === productId,
      );
      if (existedProduct === -1) {
        return handleObjectNotFound(res, "User");
      }
      if (!user.cart.items[existedProduct]) {
        return handleObjectNotFound(res, "User");
      }

      const price = user.cart.items[existedProduct].price;
      const finalPrice = quantity * (price ?? 0);
      user.cart.items[existedProduct].quantity = quantity;
      user.cart.totalPrice = finalPrice;

      await user.save();

      return res.status(204).send();
    } catch (error) {
      return handleError(res, error);
    }
  }

  // public async toggleProductCart(req: Request, res: Response) {
  //   try {
  //     const { userId, productId } = req.params;
  //     const product = await Product.findById(productId);
  //     if (!product) return handleObjectNotFound(res, "Product");

  //     const user = await User.findById(userId).select("wishlist");
  //     if (!user) return handleObjectNotFound(res, "User");

  //     const productExisted = user.wishlist.includes(createObjectId(productId));
  //     if (productExisted) {
  //       user.cart.pull(productId);
  //     } else {
  //       user.cart?.push(productId);
  //     }
  //     const userSaved = await user.save();
  //     if (!userSaved) return handleBadSaved(res);

  //     return res.status(200).json(userSaved);
  //   } catch (e) {
  //     return handleError(res, e);
  //   }
  // }

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
