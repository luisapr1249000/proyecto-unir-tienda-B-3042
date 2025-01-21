import multer from "multer";
import multerS3 from "multer-s3";
import { Request } from "express";
import { s3 } from "./multer.config";
import { fileFilter, limits } from "../../utils/multer.utils";
import { env } from "../envConfig";
import { generateUniqueValue } from "../../utils/utils";

const s3ReviewStorage = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: env.AWS_S3_BUCKET_NAME,
    metadata: (_req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: function (req: Request, file, cb) {
      const { reviewId } = req.params;
      const uniqueFileName = generateUniqueValue(file.originalname);
      const fullPath = `public/products/${reviewId}/${uniqueFileName}`;
      cb(null, fullPath);
    },
  }),
  fileFilter,
  limits,
});

export const uploadImageReview = s3ReviewStorage.array("file", 5);
