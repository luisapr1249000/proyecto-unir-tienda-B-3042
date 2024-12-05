import { Router } from "express";
import productReportController from "../controllers/productReport.controller";
const router = Router();

router.get(
  "/products/:productId/reports/",
  productReportController.getReportsFromProduct,
);

router.post(
  "/products/:productId/reporst",
  productReportController.createReport,
);
router.put(
  "/products/:productId/reports/:reportId/",
  productReportController.updateReport,
);
router.delete(
  "/products/:productId/reports/:reportId/",
  productReportController.deleteReport,
);
router.get(
  "/products/:productId/reports/:reportId",
  productReportController.getReportedProductById,
);
router.get(
  "/users/products/reports/",
  productReportController.getReportedProductstByUser,
);
