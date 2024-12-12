import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import {
  checkRefreshTokenAndGenAccessToken,
  checkToken,
  createPayload,
  genAccessToken,
  genRefreshToken,
  setTokenCookie,
} from "../utils/auth.utils";
import { handleError, handleObjectNotFound } from "../utils/error.utils";
import { DEFAULT_COOKIES_DAY } from "../constants";
import { createNodemailMessage } from "../utils/nodemail.utils";
import { transporter } from "../config/nodemail/nodemail.config";

class AuthController {
  public async signup(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser)
        return res.status(400).json({ message: "User already exists." });

      const user = new User({ email, password, username });
      const userSaved = await user.save();
      if (!userSaved)
        return res.status(400).json({ message: "Something went bad." });

      const payload = createPayload(
        userSaved._id.toString(),
        userSaved.username,
      );

      const accessToken = genAccessToken(payload);
      const refreshToken = genRefreshToken(payload);

      setTokenCookie(res, "refreshToken", refreshToken, null);
      setTokenCookie(res, "accessToken", accessToken, null);
      return res.status(201).json({ userSaved, accessToken });
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const { rememberMe, loginValue, password } = req.body;
      const user = await User.findOne({
        $or: [{ email: loginValue }, { username: loginValue }],
      }).select("+password");

      if (!user) return res.status(404).json({ message: "User not found" });

      const passwordIsValid = user.comparePasswords(password);
      if (!passwordIsValid)
        return res.status(400).json({ message: "Invalid credentials" });

      const payload = createPayload(user._id.toString(), user.username);

      const accessToken = genAccessToken(payload);
      const refreshToken = genRefreshToken(payload);

      // console.log(accessToken, "\n", refreshToken);

      setTokenCookie(
        res,
        "refreshToken",
        refreshToken,
        rememberMe ? DEFAULT_COOKIES_DAY : null,
      );
      setTokenCookie(
        res,
        "accessToken",
        accessToken,
        rememberMe ? DEFAULT_COOKIES_DAY : null,
      );

      user.lastLogin = new Date();
      await user.save();

      return res.status(200).json({ userId: user._id.toString() });
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

      const newAccessToken = checkRefreshTokenAndGenAccessToken(refreshToken);
      if (!newAccessToken)
        return res.status(403).json({ error: "Invalid refresh token" });

      setTokenCookie(res, "accessToken", newAccessToken);
      return res.status(200).json();
    } catch (e) {
      return handleError(res, e);
    }
  }
  public logout(_req: Request, res: Response) {
    res.cookie("accessToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.cookie("refreshToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    return res.status(200).json({
      status: "success",
      message: "Logged out",
    });
  }

  public getAuthUser(req: Request, res: Response) {
    return res.status(200).json({ user: req.user });
  }

  public async confirmationEmail(req: Request, res: Response) {
    try {
      const { token } = req.query;
      const decoded = checkToken(token as string);
      if (!decoded) return handleObjectNotFound(res, "User");
      const user = await User.findById(decoded.sub);
      if (!user) return handleObjectNotFound(res, "User");
      user.hasConfirmedEmail = true;
      await user.save();
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async resendConfirmationEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return handleObjectNotFound(res, "User");
      const token = genAccessToken({
        sub: user._id.toString(),
        username: user.username,
      });
      const url = `${process.env.SERVER_DIRECTION_DEV}/auth/confirmation-email?token=${token}`;
      const message = `<h3>Welcome ${user.username}!</h3>
           <p>Please confirm your email by clicking the link below:</p>
           <a href="${url}">Confirm your email</a>`;
      const mail = createNodemailMessage(
        user.email,
        "Confirmation Email",
        message,
      );
      await transporter.sendMail(mail);
      return res
        .status(200)
        .json({ message: "A confirmation email has been sent." });
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async resetPassword(req: Request, res: Response) {
    try {
      const { token } = req.query;
      const { newPassword } = req.body;
      const decoded = checkToken(token as string);
      if (!decoded) return handleObjectNotFound(res, "User");
      const user = await User.findById(decoded.sub).select("+password");
      if (!user) return handleObjectNotFound(res, "User");
      const SALT_ROUNDS = 10;
      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const hash = bcrypt.hashSync(newPassword, salt);
      user.password = hash;
      await user.save();
      return res.status(200).json(user);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async resendResetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return handleObjectNotFound(res, "User");
      const token = genAccessToken({
        sub: user._id.toString(),
        username: user.username,
      });
      const url = `${process.env.SERVER_DIRECTION_DEV}/auth/reset-password?token=${token}`;
      const message = `<h3>Hello ${user.username}!</h3>
           <p>Please confirm your reset password by clicking the link below:</p>
           <a href="${url}">Reset Password</a>`;
      const mail = createNodemailMessage(
        user.email,
        "Confirmation Email",
        message,
      );
      await transporter.sendMail(mail);
      return res
        .status(200)
        .json({ message: "A reset password has been sent." });
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new AuthController();
