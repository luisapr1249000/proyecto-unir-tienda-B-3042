import { Router } from "express";
import reportController from "../controllers/report.controller";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateObjectQueryParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import {
  reportInputSchema,
  reportResolutionSchema,
} from "../validation-schemas/report.validation";
import { REPORTED_ID } from "../constants";
import { reportPaginationAndSortSchema } from "../validation-schemas/query.validation";

const router = Router();

router.get(
  "/reports",
  // authMiddleware,
  // isAdmin,
  validateObjectQueryParams(reportPaginationAndSortSchema),
  reportController.getReportsWithPagination,
);

router.post(
  "/reports/:reportedItemId/",
  authMiddleware,
  validateObjectIdParams(["reportedItemId"]),
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

export { router as ReportRoutes };
