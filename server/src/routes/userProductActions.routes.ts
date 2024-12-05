import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { isUserOwnerOrAdmin } from "../middlewares/checkUserOrAdmin.middleware";
import {
  validateObjectIdParams,
  checkProductExists,
} from "../middlewares/requestValidation.middleware";
import userProductActionController from "../controllers/userProductAction.controller";
import { USER_ID, USER_ID_AND_PRODUCT_ID } from "../constants";

const router = Router();
// -------------------------------- cart ------------------
// router.get(
//   "/users/:userId/cart",
//   authMiddleware,
//   validateObjectIdParams(USER_ID),
//   isUserOwnerOrAdmin,
//   userProductActionController.getUserCart,
// );

// router.post(
// "/users/:userId/cart/:productId",
// authMiddleware,
// validateObjectIdParams(USER_ID_AND_PRODUCT_ID),
// isUserOwnerOrAdmin,
// checkProductExists,
// userProductActionController.toggleProductCart,
// );

router.post(
  "/users/:userId/cart/:productId",
  authMiddleware,
  validateObjectIdParams(USER_ID_AND_PRODUCT_ID),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.addProductToCart,
);

router.delete(
  "/users/:userId/cart/:productId",
  authMiddleware,
  validateObjectIdParams(USER_ID_AND_PRODUCT_ID),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.removeProductFromCart,
);

// -------------------------------- cart ------------------
// -------------------------------- saved products ------------------
router.get(
  "/users/:userId/saved-products",
  authMiddleware,
  validateObjectIdParams(USER_ID),
  isUserOwnerOrAdmin,
  userProductActionController.getUseSavedProducts,
);

router.post(
  "/users/:userId/saved-products/:productId",
  authMiddleware,
  validateObjectIdParams(USER_ID_AND_PRODUCT_ID),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.toggleSavedProducts,
);

// -------------------------------- saved products ------------------
// -------------------------------- wishlist ------------------
router.get(
  "/users/:userId/wishlist",
  authMiddleware,
  validateObjectIdParams(USER_ID),
  isUserOwnerOrAdmin,
  userProductActionController.getUseWishlist,
);
router.post(
  "/users/:userId/wishlist/:productId",
  authMiddleware,
  validateObjectIdParams(USER_ID_AND_PRODUCT_ID),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.toggleProductWishlist,
);

// -------------------------------- end toggle cart ------------------
// -------------------------------- toggle saved products ------------------

// -------------------------------- end toggle saved products ------------------

export { router as UserProductActionsRoutes };
