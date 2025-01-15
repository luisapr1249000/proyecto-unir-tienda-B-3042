import { Request, Response } from "express";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import Report from "../models/report.model";
import { extractAuthUserId } from "../utils/auth.utils";
import { getDefaultPaginationOptions } from "../utils/utils";

class Reportcontroller {
  public async createReport(req: Request, res: Response) {
    try {
      const { reporteItemId } = req.params;
      const { itemType, reason, problemDescription } = req.body;

      const userId = extractAuthUserId(req);
      const alreadyReported = await Report.findOne({
        itemType: itemType,
        reportedItem: reporteItemId,
      });
      if (alreadyReported) {
        return res
          .status(400)
          .json({ message: "You already reported this item" });
      }
      const report = new Report({
        reportedItem: reporteItemId,
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

  public async getReports(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };
      const reports = await Report.paginate({}, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "Report");
      }
      return res.status(200).json(reports);
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

  public async getReportsByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };

      const query = {
        reporter: userId,
      };
      const reports = await Report.paginate(query, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportsFromProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };

      const query = {
        reportedItem: productId,
        itemType: "Product",
      };
      const reports = await Report.paginate(query, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportsFromReview(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };

      const query = {
        reportedItem: reviewId,
        itemType: "Review",
      };
      const reports = await Report.paginate(query, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportsFromUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };

      const query = {
        reportedItem: userId,
        itemType: "User",
      };
      const reports = await Report.paginate(query, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportedReviews(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };
      const query = {
        itemType: "Review",
      };
      const reports = await Report.paginate(query, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "Review");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportedProducts(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };
      const query = {
        itemType: "Product",
      };
      const reports = await Report.paginate(query, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportedUsers(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["reporter", "reportedItem"],
      };
      const query = {
        itemType: "User",
      };
      const reports = await Report.paginate(query, paginationOptions);
      if (!reports || reports.docs.length === 0) {
        return handleObjectNotFound(res, "User");
      }
      return res.status(200).json(reports);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new Reportcontroller();
