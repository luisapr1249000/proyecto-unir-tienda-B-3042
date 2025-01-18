import { api } from "../../config/axios.config";
import {
  Product,
  ProductId,
  ProductQuestionContent,
  ProductQuestionAnswer,
  ProductUserQuestionId,
} from "../../types/product";

export const createUserQuestionForOneProduct = async ({
  productId,
  content,
}: ProductQuestionContent & ProductId) => {
  const response = await api.post<Product>(`/products/${productId}/questions`, {
    content,
  });
  return response.data;
};

export const updateUserQuestionForOneProduct = async ({
  productId,
  content,
  userQuestionId,
}: ProductQuestionContent & ProductId & ProductUserQuestionId) => {
  const response = await api.put<Product>(
    `/products/${productId}/questions/${userQuestionId}`,
    { content }
  );
  return response.data;
};

export const answerUserQuestionForOneProduct = async ({
  productId,
  answer,
  userQuestionId,
}: ProductId & ProductUserQuestionId & ProductQuestionAnswer) => {
  const response = await api.put<Product>(
    `/products/${productId}/questions/${userQuestionId}/answer`,
    { answer }
  );
  return response.data;
};

export const deleteUserQuestionForOneProduct = async ({
  productId,
  userQuestionId,
}: ProductId & ProductUserQuestionId) => {
  await api.delete<Product>(
    `/products/${productId}/questions/${userQuestionId}/answer`
  );
};
