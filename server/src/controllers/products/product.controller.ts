import { Request, Response } from "express";
import { extractAuthUserId } from "../../utils/auth.utils";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../../utils/error.utils";
import { Product } from "../../models/product.model";
import { Image } from "../../types/image";
import {
  deleteS3Objects,
  deleteSingleS3Object,
} from "../../config/multer/multer.config";
import { getDefaultPaginationOptions } from "../../utils/utils";

class ProductController {
  public async createProduct(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const price = parseFloat(req.body.price);
      const discount = parseFloat(req.body.discount ?? 0);
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

      return res.status(201).json(savedProduct);
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
      console.log(req.files);
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
      console.log("should be here");
      const product = await Product.findByIdAndUpdate(
        productId,
        {
          images: images,
        },
        { new: true },
      );
      console.log("should be here too");
      if (!product) return handleObjectNotFound(res, "Product", true);

      console.log("should be here three");
      console.log(product);
      return res.status(200).json(product);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteImagesFromProduct(req: Request, res: Response) {
    try {
      const { deletedImages } = req.query as { deletedImages: string[] };
      if (!deletedImages) return res.status(204).json(deletedImages);

      const { productId } = req.params;
      const product = await Product.findByIdAndUpdate(productId, {
        images: { $pull: { url: { $in: deletedImages } } },
      });
      if (!product) return handleObjectNotFound(res, "Product", true);

      if (deletedImages.length > 1) {
        await deleteS3Objects(deletedImages);
      } else {
        const image = deletedImages[0];
        if (!image) return res.status(204).json(deletedImages);
        deleteSingleS3Object(image);
      }

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
      const updates = {
        ...req.body,
        finalPrice: finalPrice,
        is_modified: true,
      };
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

      return res.status(204).send();
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
      const products = await Product.paginate(productQuery, paginationOptions);
      if (!products || products.docs.length === 0)
        return handleObjectNotFound(res, "Product", true);

      return res.status(200).json(products);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId)
        .select("+productQuestions")
        .populate("productQuestions categories author");
      if (!product) return handleObjectNotFound(res, "Product");

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
