import multer from "multer";
import multerS3 from "multer-s3";
import { config } from "dotenv";
import { Request } from "express";
import { s3 } from "./multer.config";
import {
  generateUniqueFileName,
  fileFilter,
  limits,
} from "../../utils/multer.utils";
config();

const s3CommentStorage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME as string,
    metadata: (_req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: function (req: Request, file, cb) {
      const { commentId } = req.params;
      const uniqueFileName = generateUniqueFileName(file.originalname);
      const fullPath = `public/products/${commentId}/${uniqueFileName}`;
      cb(null, fullPath);
    },
  }),
  fileFilter,
  limits,
});

export const uploadImageComment = s3CommentStorage.array("file", 5);
