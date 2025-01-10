import { Request, Response } from "express";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import Report from "../models/report.model";
import { extractAuthUserId } from "../utils/auth.utils";
import { getDefaultPaginationOptions } from "../utils/utils";

class Reportcontroller {
  public async createReport(req: Request, res: Response) {
    try {
      const userId = extractAuthUserId(req);
      const alreadyReported = await Report.findOne({
        itemType: req.body.itemType,
        reportedItem: req.body.reportedItem,
      });
      if (alreadyReported) {
        return res
          .status(400)
          .json({ message: "You already reported this item" });
      }
      const { reportedItem, itemType, reason, problemDescription } = req.body;
      const report = new Report({
        reportedItem,
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
      const { reportedId } = req.params;
      const reportedPost = await Report.findByIdAndUpdate(
        reportedId,
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
      const { reportedId } = req.params;
      const reportedPost = await Report.findByIdAndDelete(reportedId);
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
      const reports = await Report.paginate(paginationOptions);
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
      const { reportedId } = req.params;
      const reportedPost = await Report.findById(reportedId).populate(
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
}

export default new Reportcontroller();
