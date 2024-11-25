import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import commentController from "../controllers/comment.controller";
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
import { uploadImageComment } from "../config/multer/multer.comment";
import { PRODUCT_ID, PRODUCT_ID_AND_COMMENT_ID, USER_ID } from "../constants";

const router = Router();

router.get(
  "/comments/",
  authMiddleware,
  isAdmin,
  validPagination,
  commentController.getAllComments,
);
router.get(
  "/comments/user/:userId",
  isAdmin,
  validPagination,
  validateObjectIdParams(USER_ID),
  commentController.getUserComments,
);

router.get(
  "/products/:productId/comments/",
  validPagination,
  validateObjectIdParams(PRODUCT_ID),
  commentController.getCommentsFromProduct,
);
router.get(
  "/products/:productId/comments/:commentId",
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  commentController.getCommentById,
);

router.post(
  "/products/:productId/comments/",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  validateSchemaBody(commentInputSchema),
  commentController.createComment,
);

router.post(
  "/products/:productId/comments/:commentId/image",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  uploadImageComment,
  commentController.uploadImages,
);

router.put(
  "/products/:productId/comments/:commentId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("commentId"),
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  validateSchemaBody(commentInputSchema),
  commentController.updateComment,
);

router.delete(
  "/products/:productId/comments/:commentId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("commentId"),
  validateObjectIdParams(PRODUCT_ID_AND_COMMENT_ID),
  commentController.deleteComment,
);

export { router as CommentRoutes };
