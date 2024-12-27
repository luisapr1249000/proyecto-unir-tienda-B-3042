import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import { s3 } from "./multer.config";
import {
  generateUniqueFileName,
  fileFilter,
  limits,
} from "../../utils/multer.utils";
import { env } from "../envConfig";
const s3ProductStorage = multer({
  storage: multerS3({
    s3: s3,
    bucket: env.AWS_S3_BUCKET_NAME,
    metadata: (_req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: function (req: Request, file, cb) {
      const { productId } = req.params;
      const uniqueFileName = generateUniqueFileName(file.originalname);
      const fullPath = `public/products/${productId}/${uniqueFileName}`;
      cb(null, fullPath);
    },
  }),
  fileFilter,
  limits,
});

export const uploadUserAvatar = s3ProductStorage.single("file");
