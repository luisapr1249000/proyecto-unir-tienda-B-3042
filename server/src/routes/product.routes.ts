import { Router } from "express";
import productController from "../controllers/product.controller";
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

const router = Router();
router.get("/products/search-post", productController.searchProducts);

router.get(
  "/products",
  validPagination,
  optionalAuth,
  productController.getProductsWithPagination,
);
router.post(
  "/products",
  authMiddleware,
  validateSchemaBody(productInputSchema),
  productController.createProduct,
);

router.post(
  "/products/:productId/image",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  uploadImageProduct,
  productController.uploadImages,
);

router.put(
  "/products/:productId",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  validateSchemaBody(productInputSchema),
  productController.updateProduct,
);
router.delete(
  "/products/:productId",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  verifyUserOwnershipOrAdminRole("productId"),
  productController.deleteProduct,
);
router.get(
  "/products/author/:userId",
  validPagination,
  validateObjectIdParams(USER_ID),
  optionalAuth,
  productController.getProductsByAuthorWithPagination,
);
router.get(
  "/products/:productId",
  optionalAuth,
  validateObjectIdParams(PRODUCT_ID),
  productController.getProductById,
);
router.get(
  "/products/category/:categoryId",
  validPagination,
  // validateObjectIdParams(["categoryId"]),
  optionalAuth,
  productController.getProductsByCategoryWithPagination,
);

router.post(
  "/products/:productId/questions/",
  authMiddleware,
  productController.createUserQuestion,
);

router.put(
  "/products/:productId/questions/:userQuestionId/",
  authMiddleware,
  productController.updateUserQuestion,
);

router.put(
  "/products/:productId/questions/:userQuestionId/answer",
  authMiddleware,
  productController.createAnswerForQuestion,
);

router.delete(
  "/products/:productId/questions/:userQuestionId/",
  authMiddleware,
  productController.deleteUserQuestion,
);

export { router as ProductRoutes };
