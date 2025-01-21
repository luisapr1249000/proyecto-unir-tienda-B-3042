import passport from "passport";
import { handleError, handleNotPermissions } from "../utils/error.utils";
import { NextFunction, Request, Response } from "express";
import { getResourceOwnerId } from "../utils/resource.utils";

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
