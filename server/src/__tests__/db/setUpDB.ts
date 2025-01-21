/* eslint-disable no-console */
import { connect, disconnect } from "mongoose";
import { createUserFixture } from "../../__fixture__/user.fixture";
import { createCategoryFixture } from "../../__fixture__/category.fixture";
import { createProductFixture } from "../../__fixture__/product.fixture";
import { createReviewFixture } from "../../__fixture__/review.fixture";
import { createReportFixture } from "../../__fixture__/report.fixture";
import { env } from "../../config/envConfig";
const DB = env.MONGO_URI_DEV as string;

export const setUpDBForTest = async () => {
  try {
    await connect(DB);
    console.log("Connected to test database successfully. ", DB);
  } catch (e) {
    console.error("Error connecting to test database:", e);
    throw e;
  }
};

export const disconnectDB = async () => {
  try {
    await disconnect();
    console.log("Disconnected from test database.");
  } catch (e) {
    console.error("Error disconnecting from test database:", e);
  }
};

const userSeeder = async () => {
  for (let index = 0; index < 500; index++) {
    await createUserFixture();
  }
};
const categorySeeder = async () => {
  for (let index = 0; index < 10; index++) {
    await createCategoryFixture();
  }
};
const productSeeder = async () => {
  for (let index = 0; index < 100; index++) {
    await createProductFixture();
  }
};

const reviewSeeder = async () => {
  for (let index = 0; index < 100; index++) {
    await createReviewFixture();
  }
};

const reportSeeder = async () => {
  for (let index = 0; index < 100; index++) {
    await createReportFixture();
  }
};

export const genSeeder = async ({
  multiple,
  users,
  categories,
  products,
}: {
  multiple?: boolean;
  users?: boolean;
  categories?: boolean;
  products?: boolean;
}) => {
  if (multiple) {
    await userSeeder();
    await categorySeeder();
    await productSeeder();
    await reviewSeeder();
    await reportSeeder();
  }

  if (users) {
    await userSeeder();
  }
  if (categories) {
    await categorySeeder();
  }

  if (products) {
    await productSeeder();
  }
};
