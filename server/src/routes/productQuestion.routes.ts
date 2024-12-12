import { Router } from "express";
import productQuestiontController from "../controllers/productQuestiont.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import { PRODUCT_ID } from "../constants";
import {
  userQuestionInputAnswerSchema,
  userQuestionInputSchema,
} from "../validation-schemas/product-schemas/product.user.question.validation";

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
  validateObjectIdParams([...PRODUCT_ID, "userQuestionId"]),
  authMiddleware,
  validateSchemaBody(userQuestionInputSchema),
  productQuestiontController.updateUserQuestion,
);

router.put(
  "/products/:productId/questions/:userQuestionId/answer",
  validateObjectIdParams([...PRODUCT_ID, "userQuestionId"]),
  authMiddleware,
  validateSchemaBody(userQuestionInputAnswerSchema),
  productQuestiontController.createAnswerForQuestion,
);

router.delete(
  "/products/:productId/questions/:userQuestionId/",
  validateObjectIdParams([...PRODUCT_ID, "userQuestionId"]),
  authMiddleware,
  productQuestiontController.deleteUserQuestion,
);
