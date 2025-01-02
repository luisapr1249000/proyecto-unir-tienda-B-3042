import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { Product } from "../models/product.model";
import Review from "../models/review.model";
import { Image } from "../types/image";
import { getAverageReview } from "../utils/product.utils";

class ReviewController {
  public async createReview(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product", true);

      const data = { ...req.body, author: authUserId, product: productId };
      const review = new Review(data);

      product.reviewCount += 1;
      await review.save();
      product.averageReview = await getAverageReview(product._id.toString());
      product.save();
      return res.status(201).json(review);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async uploadImages(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      if (!req.files || req.files.length === 0)
        return handleObjectNotFound(res, "Product");

      const images: Image[] = [];
      for (const file of req.files as Express.Multer.File[]) {
        const fileName = file.location.split("/").pop() as string;
        const image: Image = {
          url: file.location,
          originalName: fileName,
          contentType: file.mimetype,
          size: file.size,
        };
        images.push(image);
      }
      const newData = { images: images };
      const review = await Review.findByIdAndUpdate(reviewId, newData, {
        new: true,
      });
      if (!review) return handleObjectNotFound(res, "Review");

      return res.status(200).json(review);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateReview(req: Request, res: Response) {
    try {
      const { productId, reviewId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product", true);
      const query = {
        _id: reviewId,
        product: productId,
      };
      const review = await Review.findOneAndUpdate(query, req.body, {
        new: true,
      });
      if (!review) return handleObjectNotFound(res, "Review");

      return res.status(200).json(review);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteReview(req: Request, res: Response) {
    try {
      const { productId, reviewId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product", true);

      const query = {
        _id: reviewId,
        product: productId,
      };
      const review = await Review.findOneAndDelete(query);
      if (!review) return handleObjectNotFound(res, "Review");

      product.reviewCount -= 1;
      product.averageReview = await getAverageReview(product._id.toString());
      product.save();
      return res.status(204).send();
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getAllReviews(req: Request, res: Response) {
    try {
      const options = {
        ...req.query,
        populate: ["author", "product"],
      };

      const query = {
        isDeleted: false,
      };

      const reviewId = await Review.paginate(query, options);
      const { docs } = reviewId;
      if (docs.length === 0 || !docs)
        return handleObjectNotFound(res, "Review", true);

      return res.status(200).json(reviewId);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReviewsFromProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const options = {
        ...req.query,
        populate: ["author"],
      };

      const query = {
        isDeleted: false,
        product: productId,
      };

      const reviewId = await Review.paginate(query, options);
      const { docs } = reviewId;
      if (docs.length === 0 || !docs)
        return handleObjectNotFound(res, "Review", true);

      return res.status(200).json(reviewId);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserReviews(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const options = {
        ...req.query,
        populate: ["author", "product"],
      };

      const query = {
        isDeleted: false,
        author: userId,
      };

      const reviewId = await Review.paginate(query, options);
      const { docs } = reviewId;
      if (docs.length === 0 || !docs)
        return handleObjectNotFound(res, "Review", true);

      return res.status(200).json(reviewId);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getReviewById(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const review = await Review.findById(reviewId)
        .populate("author")
        .populate("product");
      if (!review) return handleObjectNotFound(res, "Review");

      return res.status(200).json(review);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new ReviewController();
