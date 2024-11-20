import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { verifyUserOwnershipOrAdminRole } from "../middlewares/checkUserOrAdmin.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
  validUsername,
} from "../middlewares/requestValidation.middleware";
import { userInputSchema } from "../validation-schemas/user.validation";

const router = Router();

router.get("/users/", validPagination, userController.getUsersWithPagination);
router.put(
  "/users/",
  authMiddleware,
  validateSchemaBody(userInputSchema),
  userController.updateUser,
);
router.delete(
  "/users/:userId",
  authMiddleware,
  validateObjectIdParams(["userId"]),
  verifyUserOwnershipOrAdminRole("userId"),
  userController.deleteUser,
);
router.get(
  "/users/:userId",
  validateObjectIdParams(["userId"]),
  userController.getUserById,
);
router.get(
  "/users/username/:username",
  validUsername,
  userController.getUserByUsername,
);

export { router as UserRoutes };
