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
import { validatePriceQuery } from "../middlewares/validatePriceQuery.middleware";

const router = Router();
router.get("/products/search-product", productController.searchProducts);

router.get(
  "/products",
  validatePriceQuery,
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
  verifyUserOwnershipOrAdminRole("productId"),
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
  validatePriceQuery,
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
  validatePriceQuery,
  validPagination,
  validateObjectIdParams(["categoryId"]),
  optionalAuth,
  productController.getProductsByCategoryWithPagination,
);

export { router as ProductRoutes };
