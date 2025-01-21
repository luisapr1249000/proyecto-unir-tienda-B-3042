import { User } from "../../models/user.model";
import { Request, Response } from "express";
import { extractAuthUserId } from "../../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../../utils/error.utils";
import { getDefaultPaginationOptions } from "../../utils/utils";
import { UserType } from "../../types/user";
import { FilterQuery } from "mongoose";

class UserController {
  public async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const usernameOrEmailTaken = await User.findExistingUser(
        req.body.username,
        req.body.email,
      );
      if (usernameOrEmailTaken) {
        return res
          .status(400)
          .json({ message: "Username or email already taken" });
      }
      const userUpdated = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!userUpdated) {
        return handleObjectNotFound(res, "User");
      }

      return res.status(200).json(userUpdated);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async uploadImages(req: Request, res: Response) {
    try {
      const authUserId = extractAuthUserId(req);

      if (!req.file) return handleObjectNotFound(res, "Product");

      const { file } = req;
      const fileName = file.location.split("/").pop();
      const image = {
        url: file.location,
        originalName: fileName,
        contentType: file.mimetype,
        size: file.size,
      };
      const user = await User.findByIdAndUpdate(
        authUserId,
        {
          avatar: image,
        },
        { new: true },
      );
      if (!user) return handleObjectNotFound(res, "User");

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async getUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);
      if (!user) return handleObjectNotFound(res, "User");

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUsersWithPagination(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const options = {
        limit,
        page,
        sort,
      };

      const { isSeller, searchQuery } = req.query;
      const filterQuery: FilterQuery<UserType> = {};

      if (isSeller) {
        filterQuery.isSeller = true;
      }

      if (searchQuery) {
        filterQuery.$text = { $search: String(searchQuery) };
      }

      const users = await User.paginate(filterQuery, options);
      if (!users || users.docs.length === 0)
        return handleObjectNotFound(res, "User", true);

      return res.status(200).json(users);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserByUsername(req: Request, res: Response) {
    const { username } = req.params;
    try {
      const user = await User.findByUsername(username ?? "");
      if (!user) return handleObjectNotFound(res, "User");

      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async changeUserRole(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true },
      );
      if (!user) return handleObjectNotFound(res, "User");
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userDeleted = await User.findByIdAndDelete(userId);
      if (!userDeleted) return handleObjectNotFound(res, "User");

      return res.status(204).send();
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getSellers(req: Request, res: Response) {
    try {
      const { limit, page, sort } = {
        ...getDefaultPaginationOptions(),
        ...req.query,
      };
      const options = {
        limit,
        page,
        sort,
        populate: ["author"],
      };

      const filterQuery: FilterQuery<UserType> = {
        isSeller: true,
      };

      if (req.query.searchQuery) {
        filterQuery.$text = { $search: String(req.query.searchQuery) };
      }

      const users = await User.paginate(filterQuery, options);
      if (!users || users.docs.length === 0)
        return handleObjectNotFound(res, "User", true);

      return res.status(200).json(users);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new UserController();
