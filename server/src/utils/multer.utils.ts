import { Request } from "express";
import multer from "multer";
import path from "path";

const generateUniqueFileName = (originalName: string) => {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomSuffix}-${originalName}`;
};

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const validExts = [".png", ".jpg", ".jpeg", ".gif"];
  const isAllowedMimeType = file.mimetype.startsWith("image/");
  const isAllowedExt = validExts.includes(
    path.extname(file.originalname.toLowerCase()),
  );
  if (isAllowedExt && isAllowedMimeType) {
    cb(null, true);
  } else {
    cb(new Error("Error: File Type not allowed"));
  }
};

const limits = { fileSize: 1024 * 1024 * 10, fieldNameSize: 20 };

export { generateUniqueFileName, fileFilter, limits };
