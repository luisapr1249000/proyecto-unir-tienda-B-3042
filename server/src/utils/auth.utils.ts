import { CookieOptions, Request, Response } from "express";
import { DEFAULT_COOKIES_DAY } from "../constants";
import { UserJwt } from "../types/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "dotenv";
config();

export const setTokenCookie = (
  res: Response,
  cookieName: string,
  token: string,
  maxAge: number | null = DEFAULT_COOKIES_DAY,
) => {
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: maxAge,
    path: "/",
    sameSite: "strict",
  } as CookieOptions;

  res.cookie(cookieName, token, opts);
};

export const createPayload = (id: string, username: string): UserJwt => {
  return {
    sub: id.toString(),
    username: username,
  };
};

export const getKey = () => {
  const key = process.env.ACCESS_TOKEN_SECRET;
  if (!key) {
    throw new Error("Missing environment variable: ACCESS_TOKEN_SECRET");
  }

  return key;
};

export const genAccessToken = (payload: UserJwt) => {
  return jwt.sign(payload, getKey(), { expiresIn: "15m" });
};

export const genRefreshToken = (payload: UserJwt) => {
  return jwt.sign(payload, getKey(), { expiresIn: "7d" });
};

export const checkRefreshTokenAndGenAccessToken = (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required.");
  }
  const key = getKey();
  const { username, sub } = jwt.verify(refreshToken, key) as UserJwt;
  const payload = { username, sub } as UserJwt;
  return genAccessToken(payload);
};

export const extractAuthUserId = (req: Request): string => {
  const userId = req.user ? (req.user as { _id: string })._id : "";
  return userId ? userId.toString() : "";
};

export const getUserIdFromAuth = (req: Request) => {
  const userId = req.user?._id?.toString();
  if (!userId) {
    throw new Error("Authenticated user ID is missing.");
  }
  return userId;
};

export const checkToken = (token: string): JwtPayload | string => {
  const decoded = jwt.verify(token, getKey()) as JwtPayload;
  return decoded || "";
};
