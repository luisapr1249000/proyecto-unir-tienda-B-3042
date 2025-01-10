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
import {
  reportInputSchema,
  reportResolutionSchema,
} from "../validation-schemas/report.validation";
import { PRODUCT_ID, REPORTED_ID, REVIEW_ID, USER_ID } from "../constants";

const router = Router();

router.get("/reports", authMiddleware, isAdmin, reportController.getReports);

router.post(
  "/reports/:reporteItemId/",
  authMiddleware,
  validateObjectIdParams(["reporteItemId"]),
  validateSchemaBody(reportInputSchema),
  reportController.createReport,
);
router.get(
  "/reports/:reportId",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(REPORTED_ID),
  reportController.getReportById,
);
router.put(
  "/reports/:reportId",
  authMiddleware,
  isAdmin,
  validateObjectIdParams(REPORTED_ID),
  validateSchemaBody(reportResolutionSchema),
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
  authMiddleware,
  isAdmin,
  reportController.getReportsFromProduct,
);
router.get(
  "/reports/reviews/:reviewId",
  validateObjectIdParams(REVIEW_ID),
  authMiddleware,
  isAdmin,
  reportController.getReportsFromReview,
);
router.get(
  "/reports/users/:userId",
  validateObjectIdParams(USER_ID),
  authMiddleware,
  isUserOwnerOrAdmin,
  reportController.getReportsByUser,
);

export { router as ReportRoutes };
