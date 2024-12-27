import { Request, Response } from "express";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import Report from "../models/report.model";
import { extractAuthUserId } from "../utils/auth.utils";
import { createObjectId } from "../utils/product.utils";

class Reportcontroller {
  public async createReport(req: Request, res: Response) {
    try {
      const userId = extractAuthUserId(req);
      const { reason } = req.body;
      const { objectId, reportType } = req.params;
      const report = new Report({
        reason,
        reporter: userId,
      });
      if (reportType === "product") {
        report.reportedProduct = createObjectId(objectId);
      } else {
        report.reportedReview = createObjectId(objectId);
      }
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
      const reportedPost = await Report.findByIdAndUpdate(reportedId);
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
      const { reportedId } = req.params;
      const reportedPost = await Report.findById(reportedId);
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
      const reports = await Report.find({ reporter: userId });
      if (!reports || reports.length === 0) {
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
      const reportedPost = await Report.find({
        reportedPost: productId,
      });
      if (!reportedPost || reportedPost.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reportedPost);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportsFromReview(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const reportedPost = await Report.find({
        reportedReview: reviewId,
      });
      if (!reportedPost || reportedPost.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reportedPost);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportedReviews(_req: Request, res: Response) {
    try {
      const query = {
        reportedReview: { $ne: null, $exists: true },
      };
      const reportedReviews = await Report.find(query);
      if (!reportedReviews || reportedReviews.length === 0) {
        return handleObjectNotFound(res, "Review");
      }
      return res.status(200).json(reportedReviews);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportedProducts(_req: Request, res: Response) {
    try {
      const query = {
        reportedProduct: { $ne: null, $exists: true },
      };
      const reportedProducts = await Report.find(query);
      if (!reportedProducts || reportedProducts.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reportedProducts);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new Reportcontroller();
