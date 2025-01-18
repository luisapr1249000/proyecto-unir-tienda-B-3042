import { Router } from "express";
import userController from "../../controllers/users/user.controller";
import {
  authMiddleware,
  isAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
  validPagination,
  validRole,
  validUsername,
} from "../../middlewares/requestValidation.middleware";
import { userInputSchema } from "../../validation-schemas/user-schemas/user.validation";
import { USER_ID } from "../../constants";

const router = Router();

router.get("/users/", userController.getUsersWithPagination);
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

router.put(
  "/users/:userId/role",
  validateObjectIdParams(USER_ID),
  authMiddleware,
  isAdmin,
  validRole,
  userController.changeUserRole,
);

router.get(
  "/users/username/:username",
  validUsername,
  userController.getUserByUsername,
);

export { router as UserRoutes };
