/* eslint-disable no-console */
import mongoose, { connect } from "mongoose";
import { config } from "dotenv";
import app from "./app";
// import { createUserFixture } from "./__fixture__/user.fixture";
// import { createCategoryFixture } from "./__fixture__/category.fixture";
// import { createProductFixture } from "./__fixture__/product.fixture";

config();
mongoose.Promise = global.Promise;

// const userSeeder = async () => {
//   for (let index = 0; index < 500; index++) {
//     await createUserFixture();
//   }
// };
// const categorySeeder = async () => {
//   for (let index = 0; index < 10; index++) {
//     await createCategoryFixture();
//   }
// };
// const productSeeder = async () => {
//   for (let index = 0; index < 100; index++) {
//     await createProductFixture();
//   }
// };

const connectDB = async () => {
  const DB_URI =
    process.env.NODE_ENV === "prod"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI_DEV;
  const PORT = process.env.PORT || 8000;

  try {
    await connect(DB_URI as string);
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Database connection error:", e);
    process.exit(1);
  }
};
connectDB().catch(console.error);
// userSeeder();
// categorySeeder();
// productSeeder();
