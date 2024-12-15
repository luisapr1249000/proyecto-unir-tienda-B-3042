/* eslint-disable no-console */
import {
  S3Client,
  DeleteObjectsCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { env } from "../envConfig";

export const s3 = new S3Client({
  region: env.AWS_S3_BUCKET_REGION as string,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const deleteS3Objects = async (key: string[]) => {
  try {
    const input = {
      Bucket: env.AWS_S3_BUCKET_NAME,
      Delete: {
        Objects: key.map((k) => ({ Key: k })),
        Quiet: false,
      },
    };
    const command = new DeleteObjectsCommand(input);
    await s3.send(command);
  } catch (e) {
    console.error(e);
  }
};

export const deleteSingleS3Object = async (key: string) => {
  try {
    const input = {
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
    };
    const command = new DeleteObjectCommand(input);
    await s3.send(command);
  } catch (e) {
    console.error(e);
  }
};
