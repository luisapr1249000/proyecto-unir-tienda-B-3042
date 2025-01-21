import { Router } from "express";
import categoryController from "../controllers/category.controller";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateObjectQueryParams,
  validateSchemaBody,
  validCategoryName,
} from "../middlewares/requestValidation.middleware";
import { categoryInputSchema } from "../validation-schemas/category.validation";
import { CATEGORY_ID } from "../constants";
import { paginationCoerceSchema } from "../validation-schemas/query.validation";

const router = Router();

router.get(
  "/categories",
  validateObjectQueryParams(paginationCoerceSchema),
  categoryController.getCategoriesWithPagination,
);

router.get(
  "/categories/:categoryId",
  validateObjectIdParams(CATEGORY_ID),
  categoryController.getCategoryById,
);

router.get(
  "/categories/name/:categoryName",
  validCategoryName,
  categoryController.getCategoryByName,
);

router.post(
  "/categories",
  authMiddleware,
  isAdmin,
  validateSchemaBody(categoryInputSchema),
  categoryController.createCategory,
);
router.put(
  "/categories/:categoryId",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(CATEGORY_ID),
  validateSchemaBody(categoryInputSchema),
  categoryController.updateCategory,
);
router.delete(
  "/categories/:categoryId",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(CATEGORY_ID),
  categoryController.deleteCategory,
);

export { router as CategoryRoutes };
