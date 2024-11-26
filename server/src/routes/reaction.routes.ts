import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import reactionController from "../controllers/reaction.controller";
import { validateSchemaBody } from "../middlewares/requestValidation.middleware";
import { reactionSchema } from "../validation-schemas/product-schemas/product.validation";

const router = Router();

router.post(
  "/products/:productId/react/",
  authMiddleware,
  validateSchemaBody(reactionSchema),
  reactionController.reactProduct,
);
router.get(
  "/products/:productId/react-status",
  authMiddleware,
  reactionController.interactStatus,
);
export { router as ReactionRoutes };
