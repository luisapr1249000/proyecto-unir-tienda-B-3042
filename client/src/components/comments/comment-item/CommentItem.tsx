import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { Comment } from "../../../types/comment";

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <Card>
      <CardHeader />
      <CardContent>
        <Typography>{comment.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentItem;
