import { Router } from "express";
import {
  authMiddleware,
  isUserOwnerOrAdmin,
} from "../../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  checkProductExists,
} from "../../middlewares/requestValidation.middleware";
import userProductActionController from "../../controllers/users/userProductAction.controller";
import { USER_ID, USER_ID_AND_PRODUCT_ID } from "../../constants";

const router = Router();
// -------------------------------- cart ------------------
router.get(
  "/users/:userId/cart",
  authMiddleware,
  validateObjectIdParams(USER_ID),
  isUserOwnerOrAdmin,
  userProductActionController.getUserCart,
);

router.post(
  "/users/:userId/cart/:productId",
  authMiddleware,
  validateObjectIdParams(USER_ID_AND_PRODUCT_ID),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.toggleProductCart,
);

// -------------------------------- cart ------------------
// -------------------------------- wishlist ------------------
router.get(
  "/users/:userId/wishlist",
  authMiddleware,
  validateObjectIdParams(USER_ID),
  isUserOwnerOrAdmin,
  userProductActionController.getUserWishlist,
);
router.post(
  "/users/:userId/wishlist/:productId",
  authMiddleware,
  validateObjectIdParams(USER_ID_AND_PRODUCT_ID),
  isUserOwnerOrAdmin,
  checkProductExists,
  userProductActionController.toggleProductWishlist,
);

export { router as UserProductActionsRoutes };
