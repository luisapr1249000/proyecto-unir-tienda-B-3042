import React from "react";
import { Comment } from "../../../types/comment";
import Grid from "@mui/material/Grid2";
import CommentItem from "../comment-item/CommentItem";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <Grid container size={{ xs: 12 }}>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </Grid>
  );
};

export default CommentList;
