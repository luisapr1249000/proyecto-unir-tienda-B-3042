import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateSchemaBody } from "../middlewares/requestValidation.middleware";
import {
  loginSchema,
  passwordChangeSchema,
  signupSchema,
} from "../validation-schemas/auth.validation";
import passport from "passport";

const router = Router();

router.post(
  "/auth/signup",
  validateSchemaBody(signupSchema),
  authController.signup,
);
router.post(
  "/auth/login",
  validateSchemaBody(loginSchema),
  authController.login,
);
router.post("/auth/logout", authMiddleware, authController.logout);
router.get("/auth/user/me", authMiddleware, authController.getAuthUser);
router.get("/auth/token/validate", authController.validateToken);
router.get("/auth/token/refresh", authController.refreshToken);
router.post(
  "/auth/change-password",
  authMiddleware,
  validateSchemaBody(passwordChangeSchema),
  authController.changePassword,
);

router.post("/auth/forgot-password", authController.forgotPassword);
router.post(
  "/auth/send-forgot-password-mail",
  authController.sendForgotPasswordMail,
);

router.post("/auth/confirmation-email", authController.confirmationEmail);
router.post(
  "/auth/send-confirmation-email",
  authController.sendConfirmationEmail,
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/auth/signup",
  }),
  (_req, res) => {
    res.redirect("/");
  },
);
export { router as AuthRoutes };
