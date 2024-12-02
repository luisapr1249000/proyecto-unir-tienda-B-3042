import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { validateSchemaBody } from "../middlewares/requestValidation.middleware";
import {
  loginSchema,
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
router.get("/auth/token/refresh", authController.refreshToken);

router.post("/auth/reset-password", authController.resetPassword);
router.post("/auth/resend-reset-password", authController.resendResetPassword);

router.post("/auth/confirmation-email", authController.confirmationEmail);
router.post(
  "/auth/resend-confirmation-email",
  authController.resendConfirmationEmail,
);

router.get(
  "/auth/google/",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/auth/login",
  }),
  (_req, res) => {
    res.redirect("http://localhost:3000");
  },
);

export { router as AuthRoutes };
