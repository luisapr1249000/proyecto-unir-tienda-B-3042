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
import { UserCartItem } from "../types/user";

class UserProductActions {
  public async getUserCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).select("cart").populate("cart");
      if (!user) return handleObjectNotFound(res, "User");

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
      const userId = extractAuthUserId(req);
      const { productId } = req.params;
      const { productQuantity } = req.body;

      if (productQuantity < 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be 0 or greater" });
      }

      const product = await Product.findById(productId)
        .select("price")
        .select("author");
      if (!product) {
        return handleObjectNotFound(res, "Product");
      }

      const user = await User.findById(userId).select("cart");
      if (!user) return handleObjectNotFound(res, "User");

      const productIndex = user.cart.items?.findIndex(
        (item) => item.productId?.toString() === productId,
      );

      if (productIndex === -1) {
        const cartItem: UserCartItem = {
          quantity: productQuantity,
          sellerId: product.author,
          price: product.price,
          productId: product._id,
        };
        user.cart.items.push(cartItem);
      }

      if (Number(productQuantity) === 0) {
        user.cart.items.splice(productIndex, 1);
      }
      if (productQuantity > 0) {
        const product = user.cart.items[productIndex];
        if (product) {
          product.quantity = productQuantity;
        }
      }

      user.cart.totalPrice = user.cart.items.reduce((accumulator, product) => {
        const price = product.price ?? 0;
        const quantity = product.quantity ?? 0;
        return accumulator + price * quantity;
      }, 0);
      await user.save();

      return res
        .status(200)
        .json({ message: "Product added to cart", cart: user });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default new UserProductActions();
