import passport from "passport";
import { handleError, handleNotPermissions } from "../utils/error.utils";
import { NextFunction, Request, Response } from "express";
import { getResourceOwnerId } from "../utils/resource.utils";
import { validateToken } from "../utils/auth.utils";
import { User } from "../models/user.model";

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies["accessToken"];
  if (accessToken) {
    const decoded = validateToken(accessToken as string);
    const user = await User.findById(decoded?.sub).select("+role");
    if (user) req.user = user;
  }

  next();
};

export const authMiddleware = passport.authenticate("jwt", { session: false });

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return handleNotPermissions(res);
  const { role } = req.user;
  if (role !== "admin") {
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
  const { userId: queryUserId } = req.query;

  if (
    authUserId === userId ||
    authUserId === queryUserId ||
    authUserRole === "admin"
  ) {
    return next();
  }

  return handleNotPermissions(res);
};

export const isReviewerOrAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authUserRole = req.user?.role;
  const authUserId = req.user?._id.toString();
  const { productId, userId } = req.query;

  if (!productId && authUserRole !== "admin") {
    return handleNotPermissions(res);
  }

  if (userId && authUserId === userId) {
    return next();
  }

  next();
};

export const verifyUserOwnershipOrAdminRole = (resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return handleNotPermissions(res);
      }
      const authUserId = req.user._id.toString();
      const authUserRole = req.user.role;
      if (authUserRole === "admin") {
        return next();
      }

      const resourceId = req.params[resource];
      if (!resourceId) return handleNotPermissions(res);

      const resourceOwnerId = await getResourceOwnerId(resource, resourceId);
      if (resourceOwnerId === authUserId) {
        return next();
      }
      return handleNotPermissions(res);
    } catch (e) {
      return handleError(res, e);
    }
  };
};
