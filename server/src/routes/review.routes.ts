import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  isAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../middlewares/checkUserOrAdmin.middleware";
import { commentInputSchema } from "../validation-schemas/comment.validation";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
} from "../middlewares/requestValidation.middleware";
import { uploadImageReview } from "../config/multer/multer.review";
import { PRODUCT_ID, PRODUCT_ID_AND_COMMENT_ID, USER_ID } from "../constants";
import reviewController from "../controllers/review.controller";

const router = Router();

router.get(
  "/comments/",
  authMiddleware,
  isAdmin,
  validPagination,
  reviewController.getAllReviews,
);
router.get(
  "/comments/user/:userId",
  isAdmin,
  validPagination,
  validateObjectIdParams(USER_ID),
  reviewController.getUserReviews,
);

router.get(
  "/products/:productId/comments/",
  validPagination,
  validateObjectIdParams(PRODUCT_ID),
  reviewController.getReviewsFromProduct,
);
router.get(
  "/products/:productId/comments/:commentId",
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  reviewController.getReviewById,
);

router.post(
  "/products/:productId/comments/",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  validateSchemaBody(commentInputSchema),
  reviewController.createReview,
);

router.post(
  "/products/:productId/comments/:commentId/image",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  uploadImageReview,
  reviewController.uploadImages,
);

router.put(
  "/products/:productId/comments/:commentId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("commentId"),
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  validateSchemaBody(commentInputSchema),
  reviewController.updateReview,
);

router.delete(
  "/products/:productId/comments/:commentId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("commentId"),
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  reviewController.deleteReview,
);

export { router as ReviewRoutes };
