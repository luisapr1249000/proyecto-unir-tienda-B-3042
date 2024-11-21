import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { validateSchemaBody } from "../middlewares/requestValidation.middleware";
import {
  loginSchema,
  signupSchema,
} from "../validation-schemas/auth.validation";

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

export { router as AuthRoutes };
