import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../utils/error.utils";
import { Product } from "../models/product.model";
import ViewedProduct from "../models/viewedProduct.model";
import { hasNotViewedRecently, hasReacted } from "../utils/product.utils";
import { Image } from "../types/image";
import { getDefaultPaginationOptions } from "../utils/query.utils";

class ProductController {
  public async createProduct(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const price = parseFloat(req.body.price);
      const discount = parseFloat(req.body.discount);
      const finalPrice = Number(
        (discount ? price * (1 - discount / 100) : price).toFixed(2),
      );
      const product = new Product({
        ...req.body,
        author: authUserId,
        finalPrice: finalPrice,
      });
      const savedProduct = await product.save();
      if (!savedProduct) return handleBadSaved(res);

      return res.status(201).json({ f: req.files, savedProduct });
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async uploadImages(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      if (!req.files || req.files.length === 0) {
        return handleObjectNotFound(res, "Product");
      }
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
      const product = await Product.findByIdAndUpdate(
        productId,
        {
          images: images,
        },
        { new: true },
      );
      if (!product) return handleObjectNotFound(res, "Product", true);

      return res.status(200).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const price = parseFloat(req.body.price);
      const discount = parseFloat(req.body.discount);
      const finalPrice = Number(
        (discount ? price * (1 - discount / 100) : price).toFixed(2),
      );
      const updates = { ...req.body, finalPrice: finalPrice };
      const product = await Product.findByIdAndUpdate(productId, updates, {
        new: true,
      });
      if (!product) return handleObjectNotFound(res, "Product", true);

      return res.status(200).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await Product.findByIdAndDelete(productId);
      if (!product) return handleObjectNotFound(res, "Product", true);

      return res.status(204).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getProductsWithPagination(req: Request, res: Response) {
    try {
      const { minPrice = 1, maxPrice = Infinity } = req.query;
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["author", "categories"],
      };
      const productQuery = { finalPrice: { $gte: minPrice, $lte: maxPrice } };
      const userAuth = extractAuthUserId(req);
      const products = await Product.paginate(productQuery, paginationOptions);
      if (products.docs.length === 0)
        return handleObjectNotFound(res, "Product", true);

      if (!userAuth) return res.status(200).json(products);

      const productsReaction = products.docs.map(async (product) => {
        const hasReactedObj = await hasReacted(
          product._id.toString(),
          userAuth,
        );

        return { product, hasReactedObj };
      });

      const productsWithReactions = await Promise.all(productsReaction);

      return res.status(200).json(productsWithReactions);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {
      // console.log(req.user);
      const { productId } = req.params;
      const product = await Product.findById(productId)
        .select("+userQuestions")
        .populate("userQuestions")
        .populate("author")
        .populate("categories");
      if (!product) return handleObjectNotFound(res, "Product");

      const noAuthUserHasViewed = req.cookies[`viewed_${productId}`];

      if (!noAuthUserHasViewed) {
        product.viewCount += 1;

        res.cookie(`viewed_${productId}`, "true", {
          maxAge: 24 * 60 * 60 * 1000,
        });
      }

      if (req.user) {
        const userId = req.user._id.toString();

        const notViewedRecently = await hasNotViewedRecently(
          userId,
          product._id.toString(),
        );

        if (notViewedRecently) {
          await ViewedProduct.create({
            product: product._id,
            userId: req.user._id,
          });
          product.viewCount += 1;
        }
      }

      await product.save();

      return res.status(200).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getProductsByAuthorWithPagination(req: Request, res: Response) {
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
        populate: ["author", "categories"],
      };
      const query = {
        author: userId,
      };
      const products = await Product.paginate(query, paginationOptions);
      if (products.docs.length === 0)
        return handleObjectNotFound(res, "Product", true);

      return res.status(200).json(products);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async getProductsByCategoryWithPagination(
    req: Request,
    res: Response,
  ) {
    try {
      const { minPrice = 1, maxPrice = Infinity } = req.query;
      const { categoryId } = req.params;
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };

      const query = {
        categories: categoryId,
        finalPrice: { $gte: minPrice, $lte: maxPrice },
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["author", "categories"],
      };

      const products = await Product.paginate(query, paginationOptions);
      if (products.docs.length === 0)
        return handleObjectNotFound(res, "Product", true);

      return res.status(200).json(products);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async searchProducts(req: Request, res: Response) {
    try {
      const { minPrice = 1, maxPrice = Infinity } = req.query;

      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };

      const { query } = req.query as { query: string };
      const myQuery = {
        $text: { $search: query },
        finalPrice: { $gte: minPrice, $lte: maxPrice },
      };
      const paginationOptions = {
        limit,
        page,
        sort,
        populate: ["author", "categories"],
      };
      const productResults = await Product.paginate(myQuery, paginationOptions);
      if (productResults.docs.length === 0)
        return handleObjectNotFound(res, "Product", true);

      return res.status(200).json(productResults);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new ProductController();
