import Review from "../models/review.model";
import { faker } from "@faker-js/faker";
import { getOrCreateProduct } from "./product.fixture";
import { getOrCreateUser } from "./user.fixture";
import { createImageArray } from "./image.fixture";

export const getTotalReviewCount = async () =>
  await Review.countDocuments().exec();

export const generateReviewInputFixture = () => ({
  content: faker.lorem.paragraph(),
  review: faker.number.int({ min: 1, max: 5 }),
  images: createImageArray(),
});

export const generateReviewFixture = async () => ({
  ...generateReviewInputFixture(),
  product: (await getOrCreateProduct())._id.toString(),
  author: await getOrCreateUser(),
});

export const createReviewFixture = async () => {
  const reviewData = await generateReviewFixture();
  const review = new Review(reviewData);
  await review.save();
  return review;
};

export const getOrCreateReview = async () => {
  const random = faker.number.int({
    min: 0,
    max: await getTotalReviewCount(),
  });

  let review = await Review.findOne().skip(random).exec();
  if (!review) {
    review = await createReviewFixture();
  }
  return review;
};
