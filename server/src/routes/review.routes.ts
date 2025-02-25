import { Router } from "express";
import {
  authMiddleware,
  isReviewerOrAdmin,
  optionalAuth,
  verifyUserOwnershipOrAdminRole,
} from "../middlewares/auth.middleware";
import { reviewInputSchema } from "../validation-schemas/review.validation";
import {
  checkIfhasAlreadyReviewed,
  validateObjectIdParams,
  validateObjectQueryParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import { uploadImageReview } from "../config/multer/multer.review";
import { PRODUCT_ID, PRODUCT_ID_AND_REVIEW_ID } from "../constants";
import reviewController from "../controllers/review.controller";
import { reviewPaginationAndSortSchema } from "../validation-schemas/query.validation";

const router = Router();

router.get(
  "/reviews",
  optionalAuth,
  isReviewerOrAdmin,
  validateObjectQueryParams(reviewPaginationAndSortSchema),
  reviewController.getReviews,
);

router.get(
  "/products/:productId/reviews/:reviewId",
  validateObjectIdParams(PRODUCT_ID_AND_REVIEW_ID),
  reviewController.getReviewById,
);

router.post(
  "/products/:productId/reviews/",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  checkIfhasAlreadyReviewed,
  validateSchemaBody(reviewInputSchema),
  reviewController.createReview,
);

router.post(
  "/products/:productId/reviews/:reviewId/images",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  uploadImageReview,
  reviewController.uploadImages,
);

router.put(
  "/products/:productId/reviews/:reviewId",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID_AND_REVIEW_ID),
  verifyUserOwnershipOrAdminRole("reviewId"),
  validateSchemaBody(reviewInputSchema),
  reviewController.updateReview,
);

router.delete(
  "/products/:productId/reviews/:reviewId",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID_AND_REVIEW_ID),
  verifyUserOwnershipOrAdminRole("reviewId"),
  reviewController.deleteReview,
);

export { router as ReviewRoutes };
