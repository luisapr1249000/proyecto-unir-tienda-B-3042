import { Router } from "express";
import {
  authMiddleware,
  isAdmin,
  isUserOwnerOrAdmin,
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
import { PRODUCT_ID, PRODUCT_ID_AND_REVIEW_ID, USER_ID } from "../constants";
import reviewController from "../controllers/review.controller";
import {
  paginationCoerceSchema,
  reviewPaginationAndSortSchema,
} from "../validation-schemas/query.validation";

const router = Router();

router.get(
  "/reviews",
  authMiddleware,
  isAdmin,
  validateObjectQueryParams(reviewPaginationAndSortSchema),
  reviewController.getReviews,
);
router.get(
  "/reviews/user/:userId",
  authMiddleware,
  isUserOwnerOrAdmin,
  validateObjectQueryParams(paginationCoerceSchema),
  validateObjectIdParams(USER_ID),
  reviewController.getUserReviews,
);

router.get(
  "/products/:productId/reviews",
  validateObjectQueryParams(paginationCoerceSchema),
  validateObjectIdParams(PRODUCT_ID),
  reviewController.getReviewsFromProduct,
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
  "/products/:productId/reviews/:reviewId/image",
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
