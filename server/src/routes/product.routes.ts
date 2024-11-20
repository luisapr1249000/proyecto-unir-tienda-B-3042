import { Router } from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { verifyUserOwnershipOrAdminRole } from "../middlewares/checkUserOrAdmin.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
} from "../middlewares/requestValidation.middleware";
import { productInputSchema } from "../validation-schemas/product.validation";
import { optionalAuth } from "../middlewares/optinalAuth.middleware";
import { uploadImageProduct } from "../config/multer/multer.product";

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
  validateObjectIdParams(["productId"]),
  uploadImageProduct,
  productController.uploadImages,
);

router.put(
  "/products/:productId",
  authMiddleware,
  validateObjectIdParams(["productId"]),
  validateSchemaBody(productInputSchema),
  productController.updateProduct,
);
router.delete(
  "/products/:productId",
  authMiddleware,
  validateObjectIdParams(["productId"]),
  verifyUserOwnershipOrAdminRole("productId"),
  productController.deleteProduct,
);
router.get(
  "/products/author/:userId",
  validPagination,
  validateObjectIdParams(["userId"]),
  optionalAuth,
  productController.getProductsByAuthorWithPagination,
);
router.get(
  "/products/:productId",
  optionalAuth,
  validateObjectIdParams(["productId"]),
  productController.getProductById,
);
router.get(
  "/products/category/:categoryId",
  validPagination,
  // validateObjectIdParams(["categoryId"]),
  optionalAuth,
  productController.getProductsByCategoryWithPagination,
);

export { router as ProductRoutes };
