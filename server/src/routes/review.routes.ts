import { Router } from "express";
import {
  authMiddleware,
  isAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../middlewares/auth.middleware";
import { reviewInputSchema } from "../validation-schemas/review.validation";
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
  "/reviews/",
  authMiddleware,
  isAdmin,
  validPagination,
  reviewController.getAllReviews,
);
router.get(
  "/reviews/user/:userId",
  isAdmin,
  validPagination,
  validateObjectIdParams(USER_ID),
  reviewController.getUserReviews,
);

router.get(
  "/products/:productId/reviews/",
  validPagination,
  validateObjectIdParams(PRODUCT_ID),
  reviewController.getReviewsFromProduct,
);
router.get(
  "/products/:productId/reviews/:reviewId",
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  reviewController.getReviewById,
);

router.post(
  "/products/:productId/reviews/",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
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
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  verifyUserOwnershipOrAdminRole("reviewId"),
  validateSchemaBody(reviewInputSchema),
  reviewController.updateReview,
);

router.delete(
  "/products/:productId/reviews/:reviewId",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  verifyUserOwnershipOrAdminRole("reviewId"),
  reviewController.deleteReview,
);

export { router as ReviewRoutes };
