import { Request, Response } from "express";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import ProductReport from "../models/productReport.model";
import { extractAuthUserId } from "../utils/auth.utils";

class ProductReportController {
  public async createReport(req: Request, res: Response) {
    try {
      const userId = extractAuthUserId(req);
      const { reason } = req.body;
      const { productId } = req.params;
      const productReport = new ProductReport({
        reason,
        reportedPost: productId,
        reporter: userId,
      });
      await productReport.save();
      return res.status(201).json(productReport);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateReport(req: Request, res: Response) {
    try {
      const { resolution } = req.body;
      const { productId, reportedId } = req.params;
      const reportedPost = await ProductReport.findOneAndUpdate(
        { reportedPost: productId, _id: reportedId },
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
      const { productId, reportedId } = req.params;
      const reportedPost = await ProductReport.findOneAndDelete({
        reportedPost: productId,
        _id: reportedId,
      });
      if (!reportedPost) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(204).send();
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportedProductById(req: Request, res: Response) {
    try {
      const { reportedId } = req.params;
      const reportedPost = await ProductReport.findById(reportedId);
      if (!reportedPost) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reportedPost);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportedProductstByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const reportedPost = await ProductReport.find({ reporter: userId });
      if (!reportedPost || reportedPost.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
      return res.status(200).json(reportedPost);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReportsFromProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const reportedPost = await ProductReport.find({
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
}

export default new ProductReportController();
