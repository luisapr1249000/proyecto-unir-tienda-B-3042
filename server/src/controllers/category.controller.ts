import { Request, Response } from "express";
import { extractAuthUserId } from "../utils/auth.utils";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../utils/error.utils";
import { Category } from "../models/category.model";
import { FilterQuery } from "mongoose";
import { getDefaultPaginationOptions } from "../utils/utils";
import { CategoryModel } from "../types/category";

class CategoryController {
  public async createCategory(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);
      const existedCategory = await Category.findExistingCategory(
        req.body.name,
      );
      if (existedCategory) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }

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
      const category = await Category.findByName(categoryName ?? "");
      if (!category) return handleObjectNotFound(res, "Category");

      return res.status(200).json(category);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const existedCategory = await Category.findExistingCategory(
        req.body.name,
      );
      if (existedCategory) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
      const category = await Category.findByIdAndUpdate(categoryId, req.body, {
        new: true,
      });
      if (!category) return handleObjectNotFound(res, "Category");

      return res.status(200).json(existedCategory);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const category = await Category.findByIdAndDelete(categoryId);
      if (!category) return handleObjectNotFound(res, "Category");
      return res.status(204).send();
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getCategoriesWithPagination(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const options = {
        limit,
        page,
        sort,
        populate: "author",
      };
      const filterQuery: FilterQuery<CategoryModel> = {};
      if (req.query.searchQuery) {
        filterQuery.$text = { $search: String(req.query.searchQuery) };
      }
      const categories = await Category.paginate(filterQuery, options);
      const { docs } = categories;
      if (docs.length <= 0) return handleObjectNotFound(res, "Categories");

      return res.status(200).json(categories);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new CategoryController();
