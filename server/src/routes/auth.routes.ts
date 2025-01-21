import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateSchemaBody } from "../middlewares/requestValidation.middleware";
import {
  resetPasswordSchema,
  loginSchema,
  mailRequestSchema,
  changePasswordSchema,
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
router.get("/auth/users/me", authMiddleware, authController.getAuthUser);
router.get("/auth/token/validate", authController.validateToken);
router.get("/auth/token/refresh", authController.refreshToken);
router.post(
  "/auth/change-password",
  authMiddleware,
  validateSchemaBody(changePasswordSchema),
  authController.changePassword,
);

router.post(
  "/auth/forgot-password",
  validateSchemaBody(resetPasswordSchema),
  authController.forgotPassword,
);
router.post(
  "/auth/send-forgot-password-mail",
  validateSchemaBody(mailRequestSchema),
  authController.sendForgotPasswordMail,
);

router.post("/auth/confirmation-email", authController.confirmationEmail);
router.post(
  "/auth/send-confirmation-email",
  validateSchemaBody(mailRequestSchema),
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
