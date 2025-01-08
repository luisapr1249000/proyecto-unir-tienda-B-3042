import { faker } from "@faker-js/faker";
import { Category } from "../models/category.model";
import { getOrCreateUser } from "./user.fixture";
import { generateUniqueValue, replaceWhitespace } from "../utils/utils";

export const getTotalCategoriesCount = async () =>
  await Category.countDocuments().exec();

export const generateCategoryFixture = () => {
  const categoryName = faker.lorem.sentence({ min: 2, max: 3 });
  const categoryNameFormated = generateUniqueValue(
    replaceWhitespace(categoryName),
  );

  return {
    name: categoryNameFormated,
    description: faker.lorem.sentence(),
  };
};

export const createCategoryFixture = async (userId?: string) => {
  const category = new Category({
    ...generateCategoryFixture(),
    author: userId ? userId : await getOrCreateUser(),
  });
  await category.save();
  // console.log("Category fixture created:", category);
  return category;
};

export const getRandomNumber = (randomNumber: number) =>
  faker.number.int({
    min: 1,
    max: randomNumber - 1,
  });

export const getOrCreateCategory = async () => {
  const skip = getRandomNumber(await getTotalCategoriesCount());
  let category = await Category.findOne().skip(skip);
  if (!category) {
    const newCategory = await createCategoryFixture();
    category = newCategory;
  }
  return category;
};
