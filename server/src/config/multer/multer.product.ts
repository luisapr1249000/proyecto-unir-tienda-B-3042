import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import { s3 } from "./multer.config";
import { fileFilter, limits } from "../../utils/multer.utils";
import { env } from "../envConfig";
import { generateUniqueValue } from "../../utils/utils";

const s3ProductStorage = multer({
  storage: multerS3({
    s3: s3,
    bucket: env.AWS_S3_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.DEFAULT_CONTENT_TYPE,
    metadata: (_req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: function (req: Request, file, cb) {
      const { productId } = req.params;
      const uniqueFileName = generateUniqueValue(file.originalname);
      const fullPath = `public/products/${productId}/${uniqueFileName}`;
      cb(null, fullPath);
    },
  }),
  fileFilter,
  limits,
});

export const uploadImageProduct = s3ProductStorage.array("file", 8);
