import { Router } from "express";
import categoryController from "../controllers/category.controller";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
} from "../middlewares/requestValidation.middleware";
import { categoryInputSchema } from "../validation-schemas/category.validation";
import { CATEGORY_ID } from "../constants";

const router = Router();
router.get(
  "/categories/search-categories",
  categoryController.searchCategories,
);
router.get(
  "/categories",
  validPagination,
  categoryController.getCategoriesWithPagination,
);

router.get(
  "/categories/:categoryId",
  validPagination,
  categoryController.getCategoryById,
);

router.get(
  "/categories/name/:categoryName",
  validPagination,
  categoryController.getCategoryByName,
);

router.post(
  "/categories",
  isAdmin,
  authMiddleware,
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
