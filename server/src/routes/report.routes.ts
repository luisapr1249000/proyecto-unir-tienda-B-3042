import { Router } from "express";
import reportController from "../controllers/report.controller";
import {
  authMiddleware,
  isAdmin,
  isUserOwnerOrAdmin,
} from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import { reportInputSchema } from "../validation-schemas/report.validation";
import {
  PRODUCT_ID,
  REPORTED_ID,
  REPORTED_OBJECT_ID,
  REVIEW_ID,
  USER_ID,
} from "../constants";

const router = Router();

router.get("/reports", authMiddleware, isAdmin, reportController.getReports);

router.post(
  "/reports/:reportItem/",
  authMiddleware,
  validateSchemaBody(reportInputSchema),
  validateObjectIdParams(REPORTED_OBJECT_ID),
  reportController.createReport,
);
router.get(
  "/reports/:reportId",
  validateObjectIdParams(REPORTED_ID),
  isAdmin,
  reportController.getReportById,
);
router.put(
  "/reports/:reportId",
  validateObjectIdParams(REPORTED_ID),
  authMiddleware,
  isAdmin,
  reportController.updateReport,
);
router.delete(
  "/reports/:reportId",
  validateObjectIdParams(REPORTED_ID),
  authMiddleware,
  isAdmin,
  reportController.deleteReport,
);

router.get(
  "/reports/products/:productId",
  validateObjectIdParams(PRODUCT_ID),
  isAdmin,
  reportController.getReportsFromProduct,
);
router.get(
  "/reports/reviews/:reviewId",
  validateObjectIdParams(REVIEW_ID),
  isAdmin,
  reportController.getReportsFromReview,
);
router.get(
  "/reports/users/:userId",
  validateObjectIdParams(USER_ID),
  isUserOwnerOrAdmin,
  reportController.getReportsByUser,
);

export { router as ReportRoutes };
