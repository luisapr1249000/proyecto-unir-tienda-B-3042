import { CookieOptions, Request, Response } from "express";
import { DEFAULT_COOKIES_DAY } from "../constants";
import { UserJwt } from "../types/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/envConfig";

export const setTokenCookie = (
  res: Response,
  cookieName: string,
  token: string,
  maxAge: number | null = DEFAULT_COOKIES_DAY,
) => {
  const opts = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: maxAge,
    path: "/",
    sameSite: "strict",
  } as CookieOptions;

  res.cookie(cookieName, token, opts);
};

export const createPayload = (id: string, username: string): JwtPayload => ({
  sub: id.toString(),
  username: username,
});

export const getKey = () => {
  const key = env.ACCESS_TOKEN_SECRET;
  return key;
};

export const genAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, getKey(), { expiresIn: "30m" }) ?? null;

export const genRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, getKey(), { expiresIn: "7d" }) ?? null;

export const validateRefreshTokenAndGenerateAccessToken = (
  refreshToken: string,
) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required.");
  }
  try {
    const { username, sub } = jwt.verify(refreshToken, getKey()) as UserJwt;
    const payload = { username, sub };
    return genAccessToken(payload);
  } catch {
    return null;
  }
};

export const extractAuthUserId = (req: Request): string => {
  const userId = req.user ? req.user._id : "";
  return userId ? userId.toString() : "";
};

export const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, getKey()) as UserJwt;
    if (!decoded || !decoded.sub) return null;
    return decoded;
  } catch {
    return null;
  }
};

export const generateUniqueUsername = () => {
  const adjectives = [
    "Quick",
    "Lazy",
    "Happy",
    "Bright",
    "Clever",
    "Silly",
    "Brave",
    "Calm",
    "Fierce",
    "Gentle",
  ];

  const nouns = [
    "Tiger",
    "Eagle",
    "Panda",
    "Wolf",
    "Dragon",
    "Lion",
    "Dolphin",
    "Shark",
    "Fox",
    "Bear",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  const randomNumber = Math.floor(Math.random() * 1001);

  const username = `${randomAdjective}${randomNoun}${randomNumber}`;

  return username.length <= 24 ? username : username.substring(0, 24);
};
