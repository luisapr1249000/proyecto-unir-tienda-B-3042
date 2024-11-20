import { faker } from "@faker-js/faker";
import { getOrCreateCategory } from "./category.fixture";
import { getOrCreateUser } from "./user.fixture";
import { Product } from "../models/product.model";

export const createProductData = async (categoryId?: string) => {
  const randomImagesNumber = faker.number.int({ min: 1, max: 8 });
  const randomCategoryNumber = faker.number.int({ min: 1, max: 5 });
  const images = [...Array(randomImagesNumber).keys()].map((_) => ({
    originalName: faker.system.fileName(),
    url: faker.image.url(),
    contentType: "image/jpeg",
    size: faker.number.float({ min: 500, max: 5000 }),
  }));

  const generateUniqueCategories = async (randomCategoryNumber: number) => {
    const uniqueCategories = [...Array(randomCategoryNumber).keys()].map(
      async () => {
        return await getOrCreateCategory();
      },
    );
    const categoriesId = await Promise.all(uniqueCategories);
    const uniqueCategoriesId = [...new Set(categoriesId)];
    return uniqueCategoriesId;
  };

  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    quantity: faker.number.int({ min: 1, max: 100 }),
    categories: categoryId
      ? [categoryId]
      : await generateUniqueCategories(randomCategoryNumber),
    specifications: {
      dimensions: {
        width: faker.number.float({ min: 10, max: 200 }).toString(),
        depth: faker.number.float({ min: 10, max: 200 }).toString(),
        height: faker.number.float({ min: 10, max: 200 }).toString(),
      },
      material: faker.commerce.productMaterial(),
      finish: faker.vehicle.color(),
      assemblyRequired: faker.datatype.boolean(),
      weightCapacity: faker.number.float({ min: 10, max: 500 }),
    },
    brand: [faker.company.name()],
    images: images,
  };
};

export const createProductFixture = async (
  userId?: string,
  categoryId?: string,
) => {
  const data = await createProductData(categoryId);
  const user = userId ? userId : await getOrCreateUser();
  const product = new Product({
    author: user,
    ...data,
  });

  await product.save();
  console.log("Product fixture created:", product);

  return product;
};
