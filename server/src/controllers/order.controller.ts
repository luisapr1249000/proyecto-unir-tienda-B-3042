import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { Order } from "../models/orders.model";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { startSession } from "mongoose";
import { Product } from "../models/product.model";
import { OrderItemInput } from "../types/orderItem";

class OrderController {
  public async createOrder(req: Request, res: Response) {
    const session = await startSession();
    session.startTransaction();

    try {
      const authUserId = extractAuthUserId(req);
      const { totalPrice, items } = req.body;
      let totalPriceCalculated = 0;
      const orderItems: OrderItemInput[] = [];
      for (const item of items) {
        const product = await Product.findById(item.productId).session(session);
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

        const order: OrderItemInput = {
          price: product.finalPrice,
          product: product._id,
          quantity: item.quantity,
          seller: product.author,
        };
        totalPriceCalculated += order.price * order.quantity;
        product.quantity -= item.quantity;
        await product.save({ session });

        orderItems.push(order);
      }
      if (totalPriceCalculated.toFixed(2) !== totalPrice.toFixed(2)) {
        return res.status(400).json({
          message: "Total price does not match the total price of the items",
        });
      }
      const order = new Order({
        customerId: authUserId,
        totalPrice,
        orderItems,
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
      const { orderId } = req.params;
      const orderUpdated = await Order.findOneAndUpdate(
        {
          _id: orderId,
        },
        req.body,
        { new: true },
      );
      if (!orderUpdated) {
        return handleObjectNotFound(res, "Order");
      }
      return res.status(200).json(orderUpdated);
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

  public async getOrders(_req: Request, res: Response) {
    try {
      const orders = await Order.find({});
      if (!orders) {
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
      const orders = await Order.find({ customerId: userId });
      if (!orders) {
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
