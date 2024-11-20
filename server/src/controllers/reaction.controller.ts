import { Request, Response } from "express";
import { handleError } from "../utils/error.utils";
import { extractAuthUserId } from "../utils/auth.utils";
import Reaction from "../models/reaction.model";
import { Product } from "../models/product.model";
class ReactionController {
  public async reactProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const authUserId = extractAuthUserId(req);
      const { interactionType } = req.body;
      const type = interactionType === "like" ? "likes" : "dislikes";
      const interactionUpdated = interactionType === "like" ? 1 : -1;

      const existingReaction = await Reaction.findOne({
        userId: authUserId,
        productId: productId,
      });

      if (existingReaction) {
        if (existingReaction.type === interactionType) {
          await Reaction.deleteOne({
            userId: authUserId,
            productId: productId,
          });
          await Product.findByIdAndUpdate(productId, { $inc: { [type]: -1 } });
          return res.status(200).json({ message: `${type} removed` });
        } else {
          await Reaction.updateOne(
            { _id: existingReaction._id },
            { type: interactionType },
          );
          await Product.findByIdAndUpdate(productId, {
            $inc: { likes: interactionUpdated, dislikes: interactionUpdated },
          });
          return res.status(200).json({ message: `${type} changed` });
        }
      } else {
        await Reaction.create({
          userId: authUserId,
          productId,
          type: interactionType,
        });
        await Product.findByIdAndUpdate(productId, { $inc: { [type]: 1 } });
        return res.status(200).json({ message: `${interactionType} added` });
      }
    } catch (e) {
      return handleError(res, e);
    }
  }
  public async interactStatus(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const authUserId = extractAuthUserId(req);
      const reaction = await Reaction.findOne({
        userId: authUserId,
        productId,
      });
      if (!reaction) {
        return res
          .status(200)
          .json({ hasReacted: false, interactionType: null });
      }
      return res
        .status(200)
        .json({ hasReacted: true, interactionType: reaction.type });
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new ReactionController();
