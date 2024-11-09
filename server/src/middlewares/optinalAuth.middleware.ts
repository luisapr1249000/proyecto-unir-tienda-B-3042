import { Request, Response, NextFunction } from "express";
import { checkToken } from "../utils/auth.utils";
import { User } from "../models/user.model";
import { User as UserModel } from "../types/user";

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
    console.log("Error de autenticación opcional:", error);
    // No establecemos req.user, y continuamos sin interrumpir la solicitud
  }
  next();
};
