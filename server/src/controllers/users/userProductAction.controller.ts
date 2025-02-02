import { User } from "../../models/user.model";
import { Request, Response } from "express";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
  isArrayEmptyOrUndefined,
} from "../../utils/error.utils";
import { Product } from "../../models/product.model";
import { extractAuthUserId } from "../../utils/auth.utils";
import { createObjectId } from "../../utils/product.utils";
import { toTwoDecimals } from "../../utils/utils";
import { Types } from "mongoose";

class UserProductActions {
  public async getUserCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId)
        .select("cart")
        .populate("cart.items.product cart.items.seller");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);

      // console.log(user);
      // const groupedBySeller = await User.aggregate([
      //   { $match: { _id: user._id } },
      //   { $unwind: "$cart.items" },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "cart.items.seller",
      //       foreignField: "_id",
      //       as: "sellerInfo",
      //     },
      //   },
      //   { $unwind: "$sellerInfo" },
      //   {
      //     $group: {
      //       _id: "$cart.items.seller",
      //       sellerName: { $first: "$sellerInfo.username" },
      //       products: {
      //         $push: {
      //           product: "$cart.items.product",
      //           quantity: "$cart.items.quantity",
      //           price: "$cart.items.price",
      //         },
      //       },
      //       totalQuantity: { $sum: "$cart.items.quantity" },
      //       totalPrice: {
      //         $sum: {
      //           $multiply: ["$cart.items.price", "$cart.items.quantity"],
      //         },
      //       },
      //     },
      //   },
      //   {
      //     $addFields: {
      //       totalPrice: { $round: ["$totalPrice", 2] }, // Redondea `totalPrice` a 2 decimales
      //     },
      //   },
      //   { $sort: { totalPrice: -1 } }, // Ordena por precio total (opcional)
      // ]);

      // console.log(groupedBySeller);
      // return res.status(200).json(groupedBySeller);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserWishlist(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId)
        .select("wishlist")
        .populate("wishlist");
      if (!user) return handleObjectNotFound(res, "User");

      if (isArrayEmptyOrUndefined(user.wishlist))
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

      const productObjectId = createObjectId(productId);
      const productExists = user.wishlist.includes(productObjectId);

      if (productExists) {
        const uptatedWishlist = user.wishlist.filter(
          (id) => !id.equals(productObjectId),
        );
        user.wishlist = uptatedWishlist;

        product.wishlistCount -= 1;
      } else {
        user.wishlist.push(productObjectId);
        product.wishlistCount += 1;
      }
      const [productSaved, userSaved] = await Promise.all([
        product.save(),
        user.save(),
      ]);
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
      const { quantity } = req.body;

      const product = await Product.findById(productId).populate("author");
      if (!product) {
        return handleObjectNotFound(res, "Product");
      }

      const user = await User.findById(userId).select("cart");
      if (!user) return handleObjectNotFound(res, "User");

      const cartItems = user.cart.items ?? [];

      const productIndex = cartItems.findIndex(
        (item) => item.product?.toString() === productId,
      );

      if (productIndex === -1 && quantity > 0) {
        const subtotal = toTwoDecimals(product.finalPrice * quantity);

        cartItems.push({
          quantity: quantity,
          seller: product.author._id,
          price: product.finalPrice,
          product: product._id,
          subtotal,
        });
      }

      const existingItem = cartItems[productIndex];
      if (existingItem) {
        if (quantity === 0) {
          const subtotal = toTwoDecimals(existingItem.subtotal);
          user.cart.totalPrice -= subtotal;
          cartItems.splice(productIndex, 1);
        }

        if (quantity > 0) {
          existingItem.quantity = quantity;
          existingItem.subtotal = toTwoDecimals(product.finalPrice * quantity);
        }
      }

      user.cart.totalPrice = cartItems.reduce((accumulator, product) => {
        const price = product.price ?? 0;
        const quantity = product.quantity ?? 0;
        return accumulator + price * quantity;
      }, 0);
      user.cart.totalItems = user.cart.items.length;
      await user.save();

      return res
        .status(200)
        .json({ message: "Product added to cart", cart: user });
    } catch (error) {
      return handleError(res, error);
    }
  }
  public async cleanUserCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("cart");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.cart.items = new Types.DocumentArray([]);
      user.cart.totalItems = 0;
      user.cart.totalPrice = 0;
      await user.save();
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error);
    }
  }

  public async cleanUserWishlist(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("wishlist");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.wishlist = [];
      await user.save();
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default new UserProductActions();
