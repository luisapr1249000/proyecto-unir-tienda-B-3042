import { faker } from "@faker-js/faker";
import { getOrCreateCategory } from "./category.fixture";
import { getOrCreateUser } from "./user.fixture";
import { Product } from "../models/product.model";
import { twoDigitsFixed } from "../utils/utils";
import { Category } from "../models/category.model";

export const getTotalProductCount = async () => await Product.countDocuments();

const generateUniqueCategoriesForProduct = async (
  randomCategoryNumber: number,
) => {
  const uniqueCategories = [...Array(randomCategoryNumber).keys()].map(
    async () => {
      return (await getOrCreateCategory())._id.toString();
    },
  );
  const categoriesId = await Promise.all(uniqueCategories);
  const uniqueCategoriesId = [...new Set(categoriesId)];
  return uniqueCategoriesId;
};

export const createProductInputFixture = async () => {
  const price = parseFloat(faker.commerce.price({ min: 10, max: 1000 }));
  const discount = faker.number.float({ min: 1, max: 99, fractionDigits: 2 });
  let finalPrice = price * (1 - discount / 100);
  finalPrice = Number(finalPrice.toFixed(2));

  const randomCategoryNumber = faker.number.int({ min: 1, max: 5 });

  return {
    name: faker.commerce.productName(),
    price: price,
    discount: discount,
    finalPrice: finalPrice,
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 1, max: 500 }),
    categories: await generateUniqueCategoriesForProduct(randomCategoryNumber),
    specifications: {
      dimensions: {
        width: twoDigitsFixed(faker.number.float({ min: 10, max: 200 })),
        depth: twoDigitsFixed(faker.number.float({ min: 10, max: 200 })),
        height: twoDigitsFixed(faker.number.float({ min: 10, max: 200 })),
      },
      material: faker.commerce.productMaterial(),
      finish: faker.vehicle.color(),
      assemblyRequired: faker.datatype.boolean(),
      weightCapacity: twoDigitsFixed(faker.number.float({ min: 10, max: 500 })),
    },
    brand: [faker.company.name()],
  };
};

const createProductImageInput = () => {
  const randomImagesNumber = faker.number.int({ min: 1, max: 5 });
  const images = [...Array(randomImagesNumber).keys()].map((_) => ({
    originalName: faker.system.fileName(),
    url: faker.image.url(),
    contentType: "image/jpeg",
    size: faker.number.float({ min: 500, max: 5000 }),
  }));
  return images;
};

export const generateProductFixture = async () => {
  const data = await createProductInputFixture();
  return {
    ...data,
    images: createProductImageInput(),
  };
};

export const createProductFixture = async (userId?: string) => {
  const data = await generateProductFixture();
  const user = userId ? userId : (await getOrCreateUser())._id.toString();
  const product = new Product({
    author: user,
    ...data,
  });

  await product.save();
  // console.log("Product fixture created:", product);

  return product;
};

export const getOrCreateProduct = async () => {
  const random = faker.number.int({
    min: 0,
    max: await getTotalProductCount(),
  });

  let product = await Product.findOne()
    .skip(random)
    .select("+productQuestions");
  if (!product) {
    product = await createProductFixture();
  }

  return product;
};

export const createProductByCategoryFixture = async (
  categoryId: string,
  userId?: string,
) => {
  const { categories: _categories, ...data } = await generateProductFixture();
  const category = await Category.findById(categoryId);
  const product = new Product({
    author: userId,
    ...data,
    categories: [category],
  });

  await product.save();
  console.log("Product fixture created:", product);

  return product;
};
