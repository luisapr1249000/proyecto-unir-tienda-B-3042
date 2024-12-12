import passport from "passport";
import { handleError, handleNotPermissions } from "../utils/error.utils";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { User as UserModel } from "../types/user";
import { checkToken } from "../utils/auth.utils";
import { getResourceOwnerId } from "../utils/resource.utils";

export const authMiddleware = passport.authenticate("jwt", { session: false });

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authUserRole = req.user?.role;
  if (authUserRole !== "admin") {
    return handleNotPermissions(res);
  }
  next();
};

export const isUserOwnerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authUserId = req.user?._id?.toString();
  const authUserRole = req.user?.role;
  const { userId } = req.params;

  if (authUserId === userId || authUserRole === "admin") {
    return next();
  }

  return handleNotPermissions(res);
};
export const verifyUserOwnershipOrAdminRole = (resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return handleNotPermissions(res);
      }
      const authUserId = req.user._id;
      const authUserRole = req.user.role;
      if (authUserRole === "admin") {
        next();
      }

      const resourceId = req.params[resource];
      const resourceOwnerId = await getResourceOwnerId(
        resource,
        resourceId ?? "",
      );
      if (resourceOwnerId === authUserId) {
        next();
      }
      return handleNotPermissions(res);
    } catch (e) {
      return handleError(res, e);
    }
  };
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["refreshToken"];
    if (token) {
      const decoded = checkToken(token);
      const user = await User.findById(decoded.sub);
      if (user) {
        req.user = user as UserModel;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error de autenticación opcional:", error);
  }
  next();
};
