import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { Order } from "../models/orders.model";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { startSession } from "mongoose";
import { Product } from "../models/product.model";
import { OrderItemInput } from "../types/orderItem";
import { User } from "../models/user.model";
import { canUpdateOrder } from "../utils/order.utils";
import { getDefaultPaginationOptions, toTwoDecimals } from "../utils/utils";

class OrderController {
  public async createOrder(req: Request, res: Response) {
    const session = await startSession();
    session.startTransaction();

    try {
      const authUserId = extractAuthUserId(req);
      const user = await User.findById(authUserId).select("cart");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { orderItems, shippingAddress } = req.body;
      const productIds: string[] = orderItems.map((item: OrderItemInput) =>
        item.product.toString(),
      );
      const items = [];
      const products = await Product.find({ _id: { $in: productIds } }).session(
        session,
      );

      let calculatedTotalPrice = 0.0;
      for (const item of orderItems) {
        const product = products.find(
          (product) => product._id.toString() === item.product.toString(),
        );
        if (!product) {
          return res.status(400).json({
            message: `Product with ID ${item.productId} not found`,
          });
        }

        if (product.quantity < item.quantity) {
          return res.status(400).json({
            message: `Insufficient quantity for product: ${product.name}`,
          });
        }

        const subtotal = toTwoDecimals(product.finalPrice * item.quantity);
        const orderItem = {
          price: product.finalPrice,
          product: product._id,
          quantity: item.quantity,
          seller: product.author,
          subtotal: subtotal,
          status: "pending",
        };
        product.quantity -= item.quantity;
        calculatedTotalPrice += orderItem.subtotal;
        await product.save({ session });

        items.push(orderItem);
        const productIndex = user?.cart.items.findIndex(
          (item) => item.product?.toString() === product._id.toString(),
        );
        if (productIndex === 1) {
          user?.cart.items.splice(productIndex, 1);
        }

        await user.save({ session });
      }

      const totalPrice = toTwoDecimals(calculatedTotalPrice);
      const order = new Order({
        customer: authUserId,
        totalPrice,
        orderItems: items,
        shippingAddress: shippingAddress,
      });
      await order.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.status(201).json(order);
    } catch (e) {
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }

      return handleError(res, e);
    }
  }

  public async updateOrder(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { orderId, orderItemId } = req.params;
      const { status } = req.body;
      const order = await Order.findById(orderId);
      if (!order) {
        return handleObjectNotFound(res, "Order");
      }

      const itemToUpdate = order.orderItems.id(orderItemId);
      if (!itemToUpdate) {
        return handleObjectNotFound(res, "Order Item");
      }

      const canUpdate = canUpdateOrder(
        authUserId,
        req.user?.role ?? "",
        order,
        status,
      );

      if (!canUpdate) {
        return res
          .status(403)
          .json({ message: "You cannot update this order" });
      }

      itemToUpdate.status = status;

      return res.status(200).json(order);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async deleteOrder(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { orderId } = req.params;
      const orderDeleted = await Order.findOneAndDelete({
        _id: orderId,
        author: authUserId,
      });
      if (!orderDeleted) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getOrders(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };

      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["customer"],
      };

      const orders = await Order.paginate({}, paginationOptions);
      if (!orders || orders.docs.length === 0) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(200).json(orders);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getOrdersByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const query = { customer: userId };

      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["customer"],
      };

      const orders = await Order.paginate(query, paginationOptions);
      if (!orders || orders.docs.length === 0) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(200).json(orders);
    } catch (e) {
      return handleError(res, e);
    }
  }

  // -------------------------------- orderItem --------------------------------
  public async updateOrderItem(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { orderItemId } = req.params;
      const { quantity, price } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return handleObjectNotFound(res, "Order");
      }

      const itemToUpdate = order.orderItems.id(orderItemId);
      if (!itemToUpdate) {
        return handleObjectNotFound(res, "Order");
      }

      if (quantity !== undefined) itemToUpdate.quantity = quantity;
      if (price !== undefined) itemToUpdate.price = price;

      await order.save();
      res.status(200).json(order);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteOrderItem(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const { orderItemId } = req.params;

      const order = await Order.findById(orderId);
      if (!order) {
        return handleObjectNotFound(res, "Order");
      }

      const itemToDelete = order.orderItems.id(orderItemId);
      if (!itemToDelete) {
        return handleObjectNotFound(res, "Order");
      }

      itemToDelete.deleteOne();
      await order.save();
      res.status(200).json(order);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new OrderController();
