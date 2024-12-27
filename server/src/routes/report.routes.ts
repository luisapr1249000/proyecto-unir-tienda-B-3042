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
import { reportedTypeSchema } from "../validation-schemas/report.validation";
import {
  PRODUCT_ID,
  REPORTED_ID,
  REPORTED_OBJECT_ID,
  REVIEW_ID,
  USER_ID,
} from "../constants";

const router = Router();

router.post(
  "/report/:objectId/:reportType",
  authMiddleware,
  validateSchemaBody(reportedTypeSchema),
  validateObjectIdParams(REPORTED_OBJECT_ID),
  reportController.createReport,
);
router.get(
  "/report/:reportId",
  validateObjectIdParams(REPORTED_ID),
  isAdmin,
  reportController.getReportById,
);
router.put(
  "/report/:reportId",
  validateObjectIdParams(REPORTED_ID),
  authMiddleware,
  reportController.updateReport,
);
router.delete(
  "/report/:reportId",
  validateObjectIdParams(REPORTED_ID),
  authMiddleware,
  reportController.deleteReport,
);

router.get(
  "/report/products/:productId",
  validateObjectIdParams(PRODUCT_ID),
  isAdmin,
  reportController.getReportsFromProduct,
);
router.get(
  "/report/reviews/:reviewId",
  validateObjectIdParams(REVIEW_ID),
  isAdmin,
  reportController.getReportsFromReview,
);
router.get(
  "/report/users/:userId",
  validateObjectIdParams(USER_ID),
  isUserOwnerOrAdmin,
  reportController.getReportsByUser,
);

export { router as ReportRoutes };
