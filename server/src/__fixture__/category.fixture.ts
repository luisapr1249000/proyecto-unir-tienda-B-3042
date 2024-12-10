import { faker } from "@faker-js/faker";
import { Category } from "../models/category.model";
import { getOrCreateUser } from "./user.fixture";

export const getTotalCategoriesCount = async () =>
  await Category.countDocuments().exec();

export const generateCategoryInputFixture = () => {
  return {
    name: faker.lorem.sentence({ min: 1, max: 20 }),
    description: faker.lorem.sentence(),
  };
};

export const generateCategoryFixture = async () => ({
  ...generateCategoryInputFixture(),
  author: await getOrCreateUser(),
});

export const createCategoryFixture = async () => {
  const category = new Category(generateCategoryFixture());
  await category.save();
  console.log("Category fixture created:", category);
  return category;
};

export const getRandomNumber = (randomNumber: number) => {
  return faker.number.int({
    min: 1,
    max: randomNumber - 1,
  });
};

export const getOrCreateCategory = async () => {
  const skip = getRandomNumber(await getTotalCategoriesCount());
  let category = await Category.findOne().skip(skip);
  if (!category) {
    const newCategory = await createCategoryFixture();
    category = newCategory;
  }
  return category._id.toString();
};
