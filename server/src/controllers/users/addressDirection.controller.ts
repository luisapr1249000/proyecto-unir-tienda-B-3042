import { Request, Response } from "express";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../../utils/error.utils";
import { User } from "../../models/user.model";

class AddressDirectionController {
  public async createAddressDirection(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("addressDirections");
      if (!user) return handleObjectNotFound(res, "User");

      user.addressDirections.push(req.body);

      const userSaved = await user.save();
      if (!userSaved) return handleBadSaved(res);
      return res.status(201).json(userSaved);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async updateAddressDirection(req: Request, res: Response) {
    try {
      const { userId, addressDirectionId } = req.params;
      const addressDirectionUpdated = await User.findOneAndUpdate(
        { _id: userId, "addressDirections._id": addressDirectionId },
        { $set: { "addressDirection.$": req.body } },
        { new: true },
      ).select("addressDirections");
      if (!addressDirectionUpdated) return handleObjectNotFound(res, "Address");

      return res.status(200).json(addressDirectionUpdated);
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async deleteAddressDirection(req: Request, res: Response) {
    try {
      const { userId, addressDirectionId } = req.params;

      const user = await User.findById(userId).select("addressDirections");
      if (!user) return handleObjectNotFound(res, "Address");

      if (!user.addressDirections.id(addressDirectionId))
        return handleObjectNotFound(res, "Address");
      user.addressDirections.id(addressDirectionId)?.deleteOne();
      const userSaved = await user.save();
      if (!userSaved) return handleBadSaved(res);
      return res.status(204).json(userSaved);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new AddressDirectionController();
