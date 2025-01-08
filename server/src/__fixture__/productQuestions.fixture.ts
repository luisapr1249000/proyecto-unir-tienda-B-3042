import { faker } from "@faker-js/faker";
import { getOrCreateUser } from "./user.fixture";
import { createProductFixture } from "./product.fixture";

export const productQuestionContentFixture = () => ({
  content: faker.lorem.sentence(),
});
export const productQuestionAnswerFixture = () => ({
  answer: faker.lorem.sentence(),
});
export const productQuestionFixture = async (userId?: string) => ({
  user: userId ?? (await getOrCreateUser()),
  ...productQuestionAnswerFixture(),
  ...productQuestionContentFixture(),
});

export const askQuestionFixture = async (userId?: string) => {
  const product = await createProductFixture(userId);
  const question = await productQuestionFixture(userId);
  product.productQuestions.push(question);
  await product.save();
  return product;
};
