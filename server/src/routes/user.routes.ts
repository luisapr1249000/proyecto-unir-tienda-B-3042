import { Router } from "express";
import userController from "../controllers/user.controller";
import {
  authMiddleware,
  isAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
  validUsername,
} from "../middlewares/requestValidation.middleware";
import {
  userInputSchema,
  userRoleSchema,
} from "../validation-schemas/user-schemas/user.validation";
import { USER_ID } from "../constants";

const router = Router();

router.get("/users/", validPagination, userController.getUsersWithPagination);
router.put(
  "/users/:userId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),
  validateSchemaBody(userInputSchema),
  userController.updateUser,
);
router.delete(
  "/users/:userId",
  authMiddleware,
  validateObjectIdParams(USER_ID),
  verifyUserOwnershipOrAdminRole("userId"),
  userController.deleteUser,
);
router.get(
  "/users/:userId",
  validateObjectIdParams(USER_ID),
  userController.getUserById,
);

router.post(
  "/users/:userId/role",
  validateObjectIdParams(USER_ID),
  validateSchemaBody(userRoleSchema),
  authMiddleware,
  isAdmin,
  userController.changeUserRole,
);

router.get(
  "/users/username/:username",
  validUsername,
  userController.getUserByUsername,
);

export { router as UserRoutes };
