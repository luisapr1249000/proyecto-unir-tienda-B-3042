/* eslint-disable no-console */
import { z } from "zod";
import { config } from "dotenv";
config();

const envSchema = z.object({
  REFRESH_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  MONGO_URI_DEV: z.string().min(1),
  MONGO_URI_PROD: z.string().optional(),
  NODE_ENV: z.string().min(1).default("dev"),
  PORT: z
    .string()
    .default("8000")
    .transform((val) => parseInt(val, 10)),

  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_S3_BUCKET_REGION: z.string().min(1),
  AWS_S3_BUCKET_NAME: z.string().min(1),

  EMAIL_SMTP_HOST: z.string().min(1),
  EMAIL_SMTP_PORT: z.string().min(1),
  EMAIL_USERNAME: z.string().min(1),
  EMAIL_PASSWORD: z.string().min(1),

  SERVER_DIRECTION_DEV: z.string().min(1),
  SERVER_DIRECTION_PROD: z.string().min(1),

  CLIENT_DIRECTION_DEV: z.string().min(1),
  CLIENT_DIRECTION_PROD: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_SECRET_KEY: z.string().min(1),
  GOOGLE_CALLBACK: z.string().min(1),
});

const { success, error, data } = envSchema.safeParse(process.env);
if (!success) {
  console.error("Environment variable validation failed:", error.format());
  process.exit(1);
}

export type EnvVariables = z.infer<typeof envSchema>;
export const env: EnvVariables = data;
