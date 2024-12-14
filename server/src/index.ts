/* eslint-disable no-console */
import mongoose, { connect } from "mongoose";
import app from "./app";
import { env } from "./config/envConfig";

mongoose.Promise = global.Promise;

const connectDB = async () => {
  const DB_URI =
    env.NODE_ENV === "prod" ? env.MONGO_URI_PROD : env.MONGO_URI_DEV;
  const PORT = env.PORT || 8000;

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
