/* eslint-disable no-console */
import mongoose, { connect } from "mongoose";
import app from "./app";
import { env } from "./config/envConfig";
import { genSeeder } from "./__tests__/db/setUpDB";
// import { createAdmin } from "./utils/mongoose-schemas/mongoose.utils";

mongoose.Promise = global.Promise;

const connectAndStartServer = async () => {
  const DB_URI =
    env.NODE_ENV === "prod" ? env.MONGO_URI_PROD : env.MONGO_URI_DEV;
  const PORT = env.PORT || 8000;

  try {
    await connect(DB_URI as string);
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    await genSeeder({ products: true });
    // await createAdmin();
  } catch (e) {
    console.error("Database connection error:", e);
    process.exit(1);
  }
};
connectAndStartServer().catch(console.error);
