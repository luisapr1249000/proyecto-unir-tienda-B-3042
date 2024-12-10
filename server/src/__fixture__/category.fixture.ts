import { faker } from "@faker-js/faker";
import { Category } from "../models/category.model";
import { getOrCreateUser } from "./user.fixture";

export const getTotalCategoriesCount = async () =>
  await Category.countDocuments().exec();

export const createCategoryInputData = () => {
  return {
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  };
};

export const createCategoryFixture = async (userId?: string) => {
  const user = userId ? userId : await getOrCreateUser();
  const category = new Category({
    author: user,
    ...createCategoryInputData(),
  });

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
  const userId = await getOrCreateUser();
  const skip = getRandomNumber(await getTotalCategoriesCount());
  let category = await Category.findOne().skip(skip);
  if (!category) {
    const newCategory = await createCategoryFixture(userId);
    category = newCategory;
  }
  return category._id.toString();
};
