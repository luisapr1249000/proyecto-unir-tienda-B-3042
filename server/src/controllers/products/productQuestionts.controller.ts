import { Request, Response } from "express";
import { extractAuthUserId } from "../../utils/auth.utils";
import {
  handleBadSaved,
  handleError,
  handleObjectNotFound,
} from "../../utils/error.utils";
import { Product } from "../../models/product.model";

class ProductQuestionsController {
  public async createUserQuestion(req: Request, res: Response) {
    try {
      const userAuth = extractAuthUserId(req);
      const { content } = req.body;
      const { productId } = req.params;
      const questionObject = { content, user: userAuth };
      const product =
        await Product.findById(productId).select("+productQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      product.productQuestions.push(questionObject);

      const savedProduct = await product.save();
      if (!savedProduct) return handleBadSaved(res);
      return res.status(201).json(savedProduct);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async updateUserQuestion(req: Request, res: Response) {
    try {
      const userAuth = extractAuthUserId(req);
      const { content } = req.body;
      const { productId, productQuestionId } = req.params;
      const product =
        await Product.findById(productId).select("+productQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      const productQuestion = product.productQuestions.id(productQuestionId);
      if (!productQuestion) return handleObjectNotFound(res, "Product");

      if (productQuestion.user && productQuestion.user.toString() !== userAuth)
        return handleObjectNotFound(res, "Product");

      productQuestion.content = content;

      const savedProduct = await product.save();
      if (!savedProduct) return handleBadSaved(res);
      return res.status(200).json(savedProduct);
    } catch (e) {
      return handleError(res, e);
    }
  }

  public async createOrUpdateAnswerQuestion(req: Request, res: Response) {
    try {
      const { answer } = req.body;
      const { productId, productQuestionId } = req.params;
      const product =
        await Product.findById(productId).select("+productQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      const productQuestion = product.productQuestions.id(productQuestionId);
      if (!productQuestion)
        return handleObjectNotFound(res, "Product Question");

      productQuestion.answer = answer;
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
      const { productId, productQuestionId } = req.params;
      const product =
        await Product.findById(productId).select("+productQuestions");
      if (!product) return handleObjectNotFound(res, "Product");

      const productQuestion = product.productQuestions.id(productQuestionId);
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

export default new ProductQuestionsController();
