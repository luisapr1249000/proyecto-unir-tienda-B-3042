import { Request, Response, NextFunction } from "express";
import { reportTypeSchema } from "../validation-schemas/report.validation";

export const checkReportType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { reportType } = req.params;
  const { success } = reportTypeSchema.safeParse(reportType);
  if (!success) return res.status(400).json({ message: "Bad Report Type" });
  next();
};
