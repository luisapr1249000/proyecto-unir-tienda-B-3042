import { connect, disconnect } from "mongoose";
import { env } from "../config/envConfig";
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
