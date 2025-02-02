import { Router } from "express";
import productController from "../../controllers/products/product.controller";
import {
  authMiddleware,
  verifyUserOwnershipOrAdminRole,
} from "../../middlewares/auth.middleware";
import {
  isSellerOrAdmin,
  validateObjectIdParams,
  validateObjectQueryParams,
  validateSchemaBody,
} from "../../middlewares/requestValidation.middleware";
import { productInputSchema } from "../../validation-schemas/product-schemas/product.validation";
import { uploadImageProduct } from "../../config/multer/multer.product";
import { PRODUCT_ID } from "../../constants";
import { productPaginationAndSortSchema } from "../../validation-schemas/query.validation";

const router = Router();

router.get(
  "/products",
  validateObjectQueryParams(productPaginationAndSortSchema),
  productController.getProductsWithPagination,
);

router.get(
  "/products/:productId",
  validateObjectIdParams(PRODUCT_ID),
  productController.getProductById,
);

router.post(
  "/products",
  authMiddleware,
  isSellerOrAdmin,
  validateSchemaBody(productInputSchema),
  productController.createProduct,
);

router.put(
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

export { router as ProductRoutes };
