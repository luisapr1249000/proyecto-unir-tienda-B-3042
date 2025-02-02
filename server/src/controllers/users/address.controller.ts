import { Request, Response } from "express";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../../utils/error.utils";
import { User } from "../../models/user.model";

class AddressDirectionController {
  public async getAddressDirections(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("addressDirections");
      if (!user) return handleObjectNotFound(res, "User");

      if (!user.addressDirections || user.addressDirections.length === 0)
        return handleObjectNotFound(res, "Address Direction");

      return res.status(200).json(user.addressDirections);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public async getUserDefaultAddressDirection(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("addressDirections");
      if (!user) return handleObjectNotFound(res, "User");

      if (!user.addressDirections || user.addressDirections.length === 0)
        return handleObjectNotFound(res, "Address Direction");

      const defaultAddressDirection = user.addressDirections.filter(
        (address) => address.isDefault,
      );
      if (!defaultAddressDirection || defaultAddressDirection.length === 0)
        return handleObjectNotFound(res, "Address Direction");

      return res.status(200).json(defaultAddressDirection[0]);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public async getAddressDirectionById(req: Request, res: Response) {
    try {
      const { userId, addressDirectionId } = req.params;
      const user = await User.findOne({ _id: userId }).select(
        "addressDirections",
      );
      if (!user) return handleObjectNotFound(res, "User");

      if (!user.addressDirections.id(addressDirectionId))
        return handleObjectNotFound(res, "Address Direction");

      return res
        .status(200)
        .json(user.addressDirections.id(addressDirectionId));
    } catch (error) {
      return handleError(res, error);
    }
  }

  public async getAddressDirectionByIdAndUsername(req: Request, res: Response) {
    try {
      const { username, addressDirectionId } = req.params;
      const user = await User.findOne({ username }).select("addressDirections");
      if (!user) return handleObjectNotFound(res, "User");

      if (!user.addressDirections || user.addressDirections.length === 0)
        return handleObjectNotFound(res, "Address Direction");

      return res
        .status(200)
        .json(user.addressDirections.id(addressDirectionId));
    } catch (error) {
      return handleError(res, error);
    }
  }

  public async createAddressDirection(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("addressDirections");
      if (!user) return handleObjectNotFound(res, "User");

      const hasAddressDirections = user.addressDirections.length > 0;
      const data = { ...req.body, isDefault: false };
      if (!hasAddressDirections) {
        data.isDefault = true;
      }
      user.addressDirections.push(data);

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
      if (user.addressDirections.length === 1) return handleBadSaved;

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

  public async setDefaultAddressDirection(req: Request, res: Response) {
    try {
      const { userId, addressDirectionId } = req.params;
      await User.updateMany(
        { _id: userId },
        { $set: { "addressDirections.$[].isDefault": false } },
      );
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId, "addressDirections._id": addressDirectionId },
        { $set: { "addressDirections.$.isDefault": true } },
      );
      if (!updatedUser) return handleBadSaved(res);
      return res.status(204).json(updatedUser);
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new AddressDirectionController();
