import React from "react";
import { RouteObject } from "react-router-dom";
import CommentCreate from "../pages/comments/CommentCreate";
import CommentUpdate from "../pages/comments/CommentUpdate";

const commentsRoutes: RouteObject[] = [
  {
    path: "/products/item/:productId/comments",
    element: <CommentCreate />,
  },
  {
    path: "/products/item/:productId/commments/:commentId",
    element: <CommentUpdate />,
  },
];

export default commentsRoutes;
