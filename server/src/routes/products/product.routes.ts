import { Router } from "express";
import productController from "../../controllers/products/product.controller";
import {
  authMiddleware,
  optionalAuth,
  verifyUserOwnershipOrAdminRole,
} from "../../middlewares/auth.middleware";
import {
  isSellerOrAdmin,
  validateObjectIdParams,
  validatePriceQuery,
  validateSchemaBody,
  validPagination,
} from "../../middlewares/requestValidation.middleware";
import { productInputSchema } from "../../validation-schemas/product-schemas/product.validation";
import { uploadImageProduct } from "../../config/multer/multer.product";
import { CATEGORY_ID, PRODUCT_ID, USER_ID } from "../../constants";

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
  isSellerOrAdmin,
  validateSchemaBody(productInputSchema),
  productController.createProduct,
);

router.post(
  "/products/:productId/images",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  uploadImageProduct,
  productController.uploadImages,
);

router.delete(
  "/products/:productId/images",
  authMiddleware,
  validateObjectIdParams(PRODUCT_ID),
  productController.deleteImagesFromProduct,
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
  validateObjectIdParams(CATEGORY_ID),
  optionalAuth,
  productController.getProductsByCategoryWithPagination,
);

export { router as ProductRoutes };
