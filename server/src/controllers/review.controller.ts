import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import {
  handleError,
  handleNotPermissions,
  handleObjectNotFound,
} from "../utils/error.utils";
import { Product } from "../models/product.model";
import Review from "../models/review.model";
import { Image } from "../types/image";
import { getAverageReview } from "../utils/product.utils";
import { Order } from "../models/orders.model";
import { getDefaultPaginationOptions } from "../utils/utils";
import { FilterQuery } from "mongoose";
import { ReviewModel } from "../types/review";

class ReviewController {
  public async createReview(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) return handleObjectNotFound(res, "Product", true);

      const hasAlreadyReviewed = await Review.findOne({
        product: productId,
        author: authUserId,
      });
      if (hasAlreadyReviewed)
        return res.status(400).json({ message: "Already reviewed" });

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
      const review = await Review.findOneAndUpdate(
        query,
        { ...req.body, is_modified: true },
        {
          new: true,
        },
      );
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

  public async getReviews(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };

      const options = {
        limit,
        page,
        sort,
        populate: ["author", "product"],
      };

      const { searchQuery } = req.query;

      const filterQuery: FilterQuery<ReviewModel> = {};

      if (searchQuery) {
        filterQuery.$text = { $search: String(searchQuery) };
      }

      const reviews = await Review.paginate(filterQuery, options);
      if (!reviews || reviews.docs.length === 0)
        return handleObjectNotFound(res, "Review", true);

      return res.status(200).json(reviews);
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
        product: productId,
      };

      const reviews = await Review.paginate(query, options);
      const { docs } = reviews;
      if (docs.length === 0 || !docs)
        return handleObjectNotFound(res, "Review", true);

      return res.status(200).json(reviews);
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
        author: userId,
      };

      const reviews = await Review.paginate(query, options);
      const { docs } = reviews;
      if (docs.length === 0 || !docs)
        return handleObjectNotFound(res, "Review", true);

      return res.status(200).json(reviews);
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

  public async canUserReview(req: Request, res: Response) {
    try {
      const { userId, productId } = req.params;
      const canReview = await Order.findOne({
        customer: userId,
        "orderItems.product": productId,
      });

      if (!canReview) return handleNotPermissions(res);

      const review = await Review.findById(req.params.reviewId);
      if (!review) return handleObjectNotFound(res, "Review");

      return res.status(200).json({ canReview });
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new ReviewController();
