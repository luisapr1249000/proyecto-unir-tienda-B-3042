import { z } from "zod";

export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
  });

export const imageFileArraySchema = z.array(imageFileSchema).max(8);

export const imageSchema = z.object({
  originalName: z.string(),
  url: z.string().url("Invalid image URL"),
  contentType: z.string(),
  size: z.number().nonnegative("Size must be a non-negative number"),
});
export type Image = z.infer<typeof imageSchema>;
export const avatarSchema = z.object({ avatar: z.instanceof(File) });
