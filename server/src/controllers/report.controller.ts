import { Request, Response } from "express";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import Report from "../models/report.model";
import { extractAuthUserId } from "../utils/auth.utils";
import { getDefaultPaginationOptions } from "../utils/utils";
import { FilterQuery } from "mongoose";
import { ReportType } from "../types/report";

class Reportcontroller {
  public async createReport(req: Request, res: Response) {
    try {
      const { reportedItemId } = req.params;
      const { itemType, reason, problemDescription } = req.body;

      const userId = extractAuthUserId(req);
      const alreadyReported = await Report.findOne({
        itemType: itemType,
        reportedItem: reportedItemId,
      });
      if (alreadyReported) {
        return res
          .status(400)
          .json({ message: "You already reported this item" });
      }
      const report = new Report({
        reportedItem: reportedItemId,
        itemType,
        reason,
        problemDescription,
        reporter: userId,
      });

      await report.save();
      return res.status(201).json(report);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateReport(req: Request, res: Response) {
    try {
      const { resolution } = req.body;
      const { reportId } = req.params;
      const reportedPost = await Report.findByIdAndUpdate(
        reportId,
        { resolution, resolved: true },
        { new: true },
      );
      if (!reportedPost) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reportedPost);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteReport(req: Request, res: Response) {
    try {
      const { reportId } = req.params;
      const reportedPost = await Report.findByIdAndDelete(reportId);
      if (!reportedPost) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(204).send();
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportById(req: Request, res: Response) {
    try {
      const { reportId } = req.params;
      const reportedPost = await Report.findById(reportId).populate(
        "reporter reportedItem",
      );
      if (!reportedPost) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reportedPost);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportsWithPagination(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };

      const { itemType, reportedItem, reason, reporter } = req.query;

      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };

      const filterQuery: FilterQuery<ReportType> = {
        ...(itemType && { itemType: String(itemType) }),
        ...(reportedItem && { reportedItem }),
        ...(reason && { reason }),
        ...(reporter && { reporter }),
      };

      const reports = await Report.paginate(filterQuery, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "Report");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new Reportcontroller();
