import { Router } from "express";
import addressDirectionController from "../../controllers/users/addressDirection.controller";
import {
  authMiddleware,
  verifyUserOwnershipOrAdminRole,
} from "../../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../../middlewares/requestValidation.middleware";
import { addressDirectionInputSchema } from "../../validation-schemas/user-schemas/addressDirection.validation";
import { ADDRESS_DIRECTION_ID } from "../../constants";

const router = Router();

router.post(
  "/users/:userId/address-direction",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.createAddressDirection,
);
router.put(
  "/users/:userId/address-direction/:addressDirectionId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),

  validateObjectIdParams(ADDRESS_DIRECTION_ID),
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.updateAddressDirection,
);
router.delete(
  "/users/:userId/address-direction/:addressDirectionId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),
  validateObjectIdParams(ADDRESS_DIRECTION_ID),
  addressDirectionController.deleteAddressDirection,
);

export { router as AddressDirectionRoutes };
