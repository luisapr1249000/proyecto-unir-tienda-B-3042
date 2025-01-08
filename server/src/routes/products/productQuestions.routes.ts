import { Router } from "express";
import {
  authMiddleware,
  verifyUserOwnershipOrAdminRole,
} from "../../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../../middlewares/requestValidation.middleware";
import { PRODUCT_ID, PRODUCT_ID_AND_QUESTION_ID } from "../../constants";
import {
  productQuestionInputSchema,
  productAnswerInputSchema,
} from "../../validation-schemas/product-schemas/productQuestions.validation";
import productQuestiontsController from "../../controllers/products/productQuestionts.controller";

const router = Router();

router.post(
  "/products/:productId/questions/",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  validateSchemaBody(productQuestionInputSchema),
  productQuestiontsController.createUserQuestion,
);

router.put(
  "/products/:productId/questions/:productQuestionId",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID_AND_QUESTION_ID),
  validateSchemaBody(productQuestionInputSchema),
  productQuestiontsController.updateUserQuestion,
);

router.put(
  "/products/:productId/questions/:productQuestionId/answer",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID_AND_QUESTION_ID),
  verifyUserOwnershipOrAdminRole("productId"),
  validateSchemaBody(productAnswerInputSchema),
  productQuestiontsController.createOrUpdateAnswerQuestion,
);

router.delete(
  "/products/:productId/questions/:productQuestionId/",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID_AND_QUESTION_ID),
  productQuestiontsController.deleteUserQuestion,
);

export { router as productQuestiontsRoutes };
