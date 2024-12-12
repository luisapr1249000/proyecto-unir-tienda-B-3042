import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../envConfig";

export const s3 = new S3Client({
  region: env.AWS_S3_BUCKET_REGION as string,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY as string,
  },
});
