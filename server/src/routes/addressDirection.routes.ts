import { Router } from "express";
import addressDirectionController from "../controllers/addressDirection.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  validateObjectIdParams,
  validateSchemaBody,
} from "../middlewares/requestValidation.middleware";
import { addressDirectionInputSchema } from "../validation-schemas/user-schemas/addressDirection.validation";
import { ADDRESS_DIRECTION_ID } from "../constants";

const router = Router();

router.post(
  "/users/address-direction",
  authMiddleware,
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.createAddressDirection,
);
router.put(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  validateObjectIdParams(ADDRESS_DIRECTION_ID),
  validateSchemaBody(addressDirectionInputSchema),
  addressDirectionController.updateAddressDirection,
);
router.delete(
  "/users/address-direction/:addressDirectionId",
  authMiddleware,
  validateObjectIdParams(ADDRESS_DIRECTION_ID),
  addressDirectionController.deleteAddressDirection,
);

export { router as AddressDirectionRoutes };
