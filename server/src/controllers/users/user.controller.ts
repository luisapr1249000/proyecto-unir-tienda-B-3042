import { User } from "../../models/user.model";
import { Request, Response } from "express";
import { extractAuthUserId } from "../../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../../utils/error.utils";

class UserController {
  public async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const usernameTaken = await User.findOne({ username: req.body.username });
      const emailTaken = await User.findOne({ email: req.body.email });
      if (usernameTaken) {
        return res.status(400).json({ message: "Username already taken" });
      }
      if (emailTaken) {
        return res.status(400).json({ message: "Email already taken" });
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
      const users = await User.paginate({}, { ...req.query });
      const { docs } = users;
      if (docs.length === 0) return handleObjectNotFound(res, "User", true);

      return res.status(200).json(users);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async getUserByUsername(req: Request, res: Response) {
    const { username } = req.params;
    try {
      const user = await User.findOne({ username: username });
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
      console.log("se ha producido un error en el cambio de rol de usuario");
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
}

export default new UserController();
