import { Router } from "express";
import addressDirectionController from "../../controllers/users/address.controller";
import {
  authMiddleware,
  verifyUserOwnershipOrAdminRole,
} from "../../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../../middlewares/requestValidation.middleware";
import { addressDirectionInputSchema } from "../../validation-schemas/user-schemas/address.validation";
import { ADDRESS_DIRECTION_ID } from "../../constants";

const router = Router();

router.get(
  "/users/:username/address-directions",
  // authMiddleware,
  // verifyUserOwnershipOrAdminRole("userId"),
  addressDirectionController.getAddressDirections,
);

router.get(
  "/users/:userId/address-directions/:addressDirectionId",
  // authMiddleware,
  // verifyUserOwnershipOrAdminRole("userId"),
  addressDirectionController.getAddressDirectionById,
);

router.post(
  "/users/:userId/address-directions",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.createAddressDirection,
);
router.put(
  "/users/:userId/address-directions/:addressDirectionId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),

  validateObjectIdParams(ADDRESS_DIRECTION_ID),
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.updateAddressDirection,
);
router.delete(
  "/users/:userId/address-directions/:addressDirectionId",
  authMiddleware,
  verifyUserOwnershipOrAdminRole("userId"),
  validateObjectIdParams(ADDRESS_DIRECTION_ID),
  addressDirectionController.deleteAddressDirection,
);

export { router as AddressDirectionRoutes };
