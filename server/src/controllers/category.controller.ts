import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../utils/error.utils";
import { Category } from "../models/category.model";

class CategoryController {
  public async createCategory(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const category = new Category({ ...req.body, author: authUserId });
      const categorySaved = await category.save();
      if (!categorySaved) return handleBadSaved(res);
      return res.status(201).json(categorySaved);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getCategoryById(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findById(categoryId);
      if (!category) return handleObjectNotFound(res, "Category");

      return res.status(200).json(category);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getCategoryByName(req: Request, res: Response) {
    try {
      const { categoryName } = req.params;
      const query = {
        name: categoryName,
      };
      const category = await Category.findOne(query);
      if (!category) return handleObjectNotFound(res, "Category");

      return res.status(200).json(category);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByIdAndUpdate(categoryId, req.body, {
        new: true,
      });
      if (!category) return handleObjectNotFound(res, "Category");

      return res.status(200).json(category);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByIdAndDelete(categoryId);
      if (!category) return handleObjectNotFound(res, "Category");
      return res.status(204);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getCategoriesWithPagination(req: Request, res: Response) {
    try {
      const options = {
        ...req.query,
        populate: "author",
      };
      const categories = await Category.paginate({}, options);
      const { docs } = categories;
      if (docs.length <= 0) return handleObjectNotFound(res, "Categories");

      return res.status(200).json(categories);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async searchCategories(req: Request, res: Response) {
    try {
      const { query } = req.query as { query: string };
      const myQuery = {
        $text: { $search: query },
      };

      const categories = await Category.paginate(myQuery, { ...req.query });
      if (categories.docs.length === 0)
        return handleObjectNotFound(res, "Product", true);

      return res.status(200).json(categories);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new CategoryController();
