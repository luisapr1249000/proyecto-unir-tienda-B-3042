import { Router } from "express";
import userController from "../../controllers/users/user.controller";
import {
  authMiddleware,
  isAdmin,
  verifyUserOwnershipOrAdminRole,
} from "../../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateObjectQueryParams,
  validateSchemaBody,
  validUsername,
} from "../../middlewares/requestValidation.middleware";
import {
  userInputSchema,
  userRoleSchema,
} from "../../validation-schemas/user-schemas/user.validation";
import { USER_ID } from "../../constants";
import { userPaginationAndSort } from "../../validation-schemas/query.validation";
import { uploadUserAvatar } from "../../config/multer/multer.user";

const router = Router();

router.get(
  "/users",
  validateObjectQueryParams(userPaginationAndSort),
  userController.getUsersWithPagination,
);

router.put(
  "/users/:userId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),
  validateSchemaBody(userInputSchema),
  userController.updateUser,
);

router.put(
  "/users/:userId/avatar",
  authMiddleware,
  uploadUserAvatar,
  userController.uploadAvatar,
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
  authMiddleware,
  isAdmin,
  validateObjectIdParams(USER_ID),
  validateSchemaBody(userRoleSchema),
  userController.changeUserRole,
);

router.get(
  "/users/username/:username",
  validUsername,
  userController.getUserByUsername,
);

export { router as UserRoutes };
