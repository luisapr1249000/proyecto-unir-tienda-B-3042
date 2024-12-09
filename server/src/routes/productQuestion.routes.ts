import { Router } from "express";
import productQuestiontController from "../controllers/productQuestiont.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { verifyUserOwnershipOrAdminRole } from "../middlewares/checkUserOrAdmin.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
} from "../middlewares/requestValidation.middleware";
import { productInputSchema } from "../validation-schemas/product-schemas/product.validation";
import { optionalAuth } from "../middlewares/optinalAuth.middleware";
import { uploadImageProduct } from "../config/multer/multer.product";
import { PRODUCT_ID, USER_ID } from "../constants";
import {
  userQuestionInputAnswerSchema,
  userQuestionInputSchema,
} from "../validation-schemas/product-schemas/product.user.question.validation";

const router = Router();

router.post(
  "/products/:productId/questions/",
  authMiddleware,
  validateSchemaBody(userQuestionInputSchema),
  productQuestiontController.createUserQuestion,
);

router.put(
  "/products/:productId/questions/:userQuestionId/",
  authMiddleware,
  validateSchemaBody(userQuestionInputSchema),
  productQuestiontController.updateUserQuestion,
);

router.put(
  "/products/:productId/questions/:userQuestionId/answer",
  authMiddleware,
  validateSchemaBody(userQuestionInputAnswerSchema),
  productQuestiontController.createAnswerForQuestion,
);

router.delete(
  "/products/:productId/questions/:userQuestionId/",
  authMiddleware,
  productQuestiontController.deleteUserQuestion,
);
