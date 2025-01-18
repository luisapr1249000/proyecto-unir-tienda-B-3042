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
import { UserCartItem } from "../../types/user";
import { createObjectId } from "../../utils/product.utils";
import { twoDigitsFixed } from "../../utils/utils";

class UserProductActions {
  public async getUserCart(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("cart.items");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(user);
      const groupedBySeller = await User.aggregate([
        { $match: { _id: user._id } },
        { $unwind: "$cart.items" },
        {
          $lookup: {
            from: "users",
            localField: "cart.items.seller",
            foreignField: "_id",
            as: "sellerInfo",
          },
        },
        { $unwind: "$sellerInfo" },
        {
          $group: {
            _id: "$cart.items.seller",
            sellerName: { $first: "$sellerInfo.username" },
            products: {
              $push: {
                product: "$cart.items.product",
                quantity: "$cart.items.quantity",
                price: "$cart.items.price",
              },
            },
            totalQuantity: { $sum: "$cart.items.quantity" },
            totalPrice: {
              $sum: {
                $multiply: ["$cart.items.price", "$cart.items.quantity"],
              },
            },
          },
        },
        {
          $addFields: {
            totalPrice: { $round: ["$totalPrice", 2] }, // Redondea `totalPrice` a 2 decimales
          },
        },
        { $sort: { totalPrice: -1 } }, // Ordena por precio total (opcional)
      ]);

      console.log(groupedBySeller);
      return res.status(200).json(groupedBySeller);
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
        user.wishlist.push(productId);
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
      const { productQuantity } = req.body;
      if (productQuantity === undefined || productQuantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be 0 or greater" });
      }

      const product = await Product.findById(productId)
        .select("+author")
        .populate("author");
      if (!product) {
        return handleObjectNotFound(res, "Product");
      }

      const user = await User.findById(userId).select("+cart");
      if (!user) return handleObjectNotFound(res, "User");

      const productIndex = user.cart.items?.findIndex(
        (item) => item.product?.toString() === productId,
      );

      console.log(product);
      if (productIndex === -1 && productQuantity > 0) {
        let subtotal = product.finalPrice * productQuantity;
        subtotal = twoDigitsFixed(subtotal);
        const cartItem: UserCartItem = {
          quantity: productQuantity,
          seller: product.author._id,
          price: product.finalPrice,
          product: product._id,
          subtotal: subtotal,
        };
        user.cart.items.push(cartItem);
      }

      if (productIndex === 1 && Number(productQuantity) === 0) {
        const subtotal = user?.cart?.items?.[productIndex]?.subtotal ?? 0;
        user.cart.totalPrice = user.cart.totalPrice - subtotal;
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
