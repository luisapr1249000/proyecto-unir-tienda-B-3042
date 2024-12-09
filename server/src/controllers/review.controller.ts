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

      product.commentCount += 1;
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
      (req.files as Express.Multer.File[]).map((file) => {
        const fileName = file.location.split("/").pop();
        const image = {
          url: file.location,
          originalName: fileName,
          contentType: file.mimetype,
          size: file.size,
        } as Image;
        images.push(image);
      });
      const review = await Review.findByIdAndUpdate(
        reviewId,
        {
          images: images,
        },
        { new: true },
      );
      if (!review) return handleObjectNotFound(res, "Review");

      return res.status(200).json(review);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateReview(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { productId, reviewId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product", true);

      const review = await Review.findOneAndUpdate(
        {
          _id: reviewId,
          author: authUserId,
          product: productId,
        },
        req.body,
        { new: true },
      );
      if (!review) return handleObjectNotFound(res, "Review");

      return res.status(200).json(review);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteReview(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { productId, reviewId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product", true);

      const review = await Review.findOneAndDelete({
        _id: reviewId,
        author: authUserId,
        product: productId,
      });
      if (!review) return handleObjectNotFound(res, "Review");

      product.commentCount -= 1;
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
      if (docs.length <= 0) return handleObjectNotFound(res, "Review", true);

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
      if (docs.length <= 0) return handleObjectNotFound(res, "Review", true);

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
      if (docs.length <= 0) return handleObjectNotFound(res, "Review", true);

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
