import { Router } from "express";
import {
  authMiddleware,
  isAdmin,
  isUserOwnerOrAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../middlewares/auth.middleware";
import orderController from "../controllers/order.controller";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import {
  orderInputSchema,
  orderItemInputSchema,
} from "../validation-schemas/order.validation";

const router = Router();

router.get("/orders", authMiddleware, isAdmin, orderController.getOrders);
router.get(
  "/orders/user/:userId",
  authMiddleware,
  isUserOwnerOrAdmin,
  orderController.getOrdersByUser,
);
router.post(
  "/orders",
  authMiddleware,
  validateSchemaBody(orderInputSchema),
  orderController.createOrder,
);
router.put(
  "/orders/:orderId",
  authMiddleware,
  validateObjectIdParams(["orderId"]),
  verifyUserOwnershipOrAdminRole("orderId"),
  validateSchemaBody(orderInputSchema),
  orderController.updateOrder,
);
router.delete(
  "/orders/:orderId",
  authMiddleware,
  validateObjectIdParams(["orderId"]),
  verifyUserOwnershipOrAdminRole("orderId"),
  orderController.deleteOrder,
);

// -------------------------------- orderItem ------------------
router.put(
  "/orders/:orderId/orderItem/:orderItem",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(["orderId", "orderItemId"]),
  validateSchemaBody(orderItemInputSchema),
  orderController.updateOrderItem,
);
router.delete(
  "/orders/:orderId/orderItem/:orderItem",
  authMiddleware,
  validateObjectIdParams(["orderId", "orderItemId"]),
  isAdmin,
  orderController.deleteOrderItem,
);

export { router as OrderRoutes };
