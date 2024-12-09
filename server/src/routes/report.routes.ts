import { Router } from "express";
import reportController from "../controllers/report.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
  isAdmin,
  isUserOwnerOrAdmin,
} from "../middlewares/checkUserOrAdmin.middleware";
import { checkReportType } from "../middlewares/report.middleware";
import { validateObjectIdParams } from "../middlewares/requestValidation.middleware";

const router = Router();

router.post(
  "/report/:objectId/:reportType",
  authMiddleware,
  checkReportType,
  validateObjectIdParams(["objectId"]),
  reportController.createReport,
);
router.get(
  "/report/:reportId",
  validateObjectIdParams(["reportId"]),
  isAdmin,
  reportController.getReportById,
);
router.put(
  "/report/:reportId",
  validateObjectIdParams(["reportId"]),
  authMiddleware,
  reportController.updateReport,
);
router.delete(
  "/report/:reportId",
  validateObjectIdParams(["reportId"]),
  authMiddleware,
  reportController.deleteReport,
);

router.get(
  "/report/products/:productId",
  validateObjectIdParams(["productId"]),
  isAdmin,
  reportController.getReportsFromProduct,
);
router.get(
  "/report/reviews/:reviewId",
  validateObjectIdParams(["reviewId"]),
  isAdmin,
  reportController.getReportsFromReview,
);
router.get(
  "/report/users/:userId",
  validateObjectIdParams(["userId"]),
  isUserOwnerOrAdmin,
  reportController.getReportsByUser,
);

export { router as ReportRoutes };
