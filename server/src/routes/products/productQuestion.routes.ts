import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../../middlewares/requestValidation.middleware";
import { PRODUCT_ID, PRODUCT_ID_AND_QUESTION_ID } from "../../constants";
import {
  userQuestionInputAnswerSchema,
  userQuestionInputSchema,
} from "../../validation-schemas/product-schemas/product.user.question.validation";
import productQuestiontController from "../../controllers/products/productQuestiont.controller";

const router = Router();

router.post(
  "/products/:productId/questions/",
  validateObjectIdParams(PRODUCT_ID),
  authMiddleware,
  validateSchemaBody(userQuestionInputSchema),
  productQuestiontController.createUserQuestion,
);

router.put(
  "/products/:productId/questions/:userQuestionId/",
  validateObjectIdParams(PRODUCT_ID_AND_QUESTION_ID),
  authMiddleware,
  validateSchemaBody(userQuestionInputSchema),
  productQuestiontController.updateUserQuestion,
);

router.put(
  "/products/:productId/questions/:userQuestionId/answer",
  validateObjectIdParams(PRODUCT_ID_AND_QUESTION_ID),
  authMiddleware,
  validateSchemaBody(userQuestionInputAnswerSchema),
  productQuestiontController.createAnswerForQuestion,
);

router.delete(
  "/products/:productId/questions/:userQuestionId/",
  validateObjectIdParams(PRODUCT_ID_AND_QUESTION_ID),
  authMiddleware,
  productQuestiontController.deleteUserQuestion,
);
