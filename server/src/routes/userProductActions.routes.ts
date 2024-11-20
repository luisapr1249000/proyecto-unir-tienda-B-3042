import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { isUserOwnerOrAdmin } from "../middlewares/checkUserOrAdmin.middleware";
import {
  validateObjectIdParams,
  checkProductExists,
} from "../middlewares/requestValidation.middleware";
import userProductActionController from "../controllers/userProductAction.controller";

const router = Router();
// -------------------------------- cart ------------------
router.get(
  "/users/:userId/cart",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  isUserOwnerOrAdmin,
  userProductActionController.getUserCart,
);
router.post(
  "/users/:userId/cart/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.addProductToCart,
);
router.delete(
  "/users/:userId/cart/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userProductActionController.removeProductFromCart,
);
// -------------------------------- cart ------------------
// -------------------------------- saved products ------------------
router.get(
  "/users/:userId/saved-products",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  isUserOwnerOrAdmin,
  userProductActionController.getUseSavedProducts,
);
router.post(
  "/users/:userId/saved-products/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.addProductToSavedProducts,
);
router.delete(
  "/users/:userId/saved-products/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userProductActionController.removeProductFromSavedProducts,
);
// -------------------------------- saved products ------------------
// -------------------------------- wishlist ------------------
router.get(
  "/users/:userId/wishlist",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  isUserOwnerOrAdmin,
  userProductActionController.getUseWishlist,
);
router.post(
  "/users/:userId/wishlist/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.addProductToWishlist,
);
router.delete(
  "/users/:userId/wishlist/:productId",
  authMiddleware,
  validateObjectIdParams(["userId", "productId"]),
  isUserOwnerOrAdmin,
  userProductActionController.removeProductFromWishlist,
);
// -------------------------------- wishlist ------------------

export { router as UserProductActionsRoutes };
