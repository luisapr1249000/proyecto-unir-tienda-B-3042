import { z } from "zod";
import {
  commentInputSchema,
  commentSchema,
} from "../validation-schemas/comment.validation";

export type Comment = z.infer<typeof commentSchema>;
export type CommentInput = z.infer<typeof commentInputSchema>;
export type CommentId = { commentId: string };
