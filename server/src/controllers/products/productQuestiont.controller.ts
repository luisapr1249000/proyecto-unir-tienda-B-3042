import { Request, Response } from "express";
import { extractAuthUserId } from "../../utils/auth.utils";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../../utils/error.utils";
import { Product } from "../../models/product.model";

class ProductQuestionController {
  public async createUserQuestion(req: Request, res: Response) {
    try {
      const userAuth = extractAuthUserId(req);
      const { questionContent } = req.body;
      const { productId } = req.params;
      const questionObject = { content: questionContent, user: userAuth };
      const product =
        await Product.findById(productId).select("+userQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      product.userQuestions.push(questionObject);

      const savedProduct = await product.save();
      if (!savedProduct) return handleBadSaved(res);
      return res.status(200).json(savedProduct);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateUserQuestion(req: Request, res: Response) {
    try {
      const userAuth = extractAuthUserId(req);
      const { questionContent } = req.body;
      const { productId, userQuestionId } = req.params;
      const product =
        await Product.findById(productId).select("+userQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      const productQuestion = product.userQuestions.id(userQuestionId);
      if (!productQuestion) return handleObjectNotFound(res, "Product");

      if (productQuestion.user.toString() !== userAuth)
        return handleObjectNotFound(res, "Product");

      productQuestion.content = questionContent;

      const savedProduct = await product.save();
      if (!savedProduct) return handleBadSaved(res);
      return res.status(200).json(savedProduct);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async createAnswerForQuestion(req: Request, res: Response) {
    try {
      const { answerContent } = req.body;
      const { productId, userQuestionId } = req.params;
      const query = { _id: productId };
      const product = await Product.findOne(query).select("+userQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      const productQuestion = product.userQuestions.id(userQuestionId);
      if (!productQuestion) return handleObjectNotFound(res, "Product");

      productQuestion.answer = answerContent;
      productQuestion.isAnswered = true;

      const savedProduct = await product.save();
      if (!savedProduct) return handleBadSaved(res);
      return res.status(200).json(savedProduct);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async deleteUserQuestion(req: Request, res: Response) {
    try {
      const { productId, userQuestionId } = req.params;
      const query = { _id: productId };
      const product = await Product.findOne(query).select("+userQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      const productQuestion = product.userQuestions.id(userQuestionId);
      if (!productQuestion) return handleObjectNotFound(res, "Product");

      productQuestion.deleteOne();
      const savedProduct = await product.save();
      if (!savedProduct) return handleBadSaved(res);

      return res.status(204).send();
    } catch (e) {
      return handleError(res, e);
    }
  }
}

export default new ProductQuestionController();
