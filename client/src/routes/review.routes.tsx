import React from "react";
import { RouteObject } from "react-router-dom";
import ReviewsCreate from "../pages/reviews/ReviewCreate";
import ReviewsUpdate from "../pages/reviews/ReviewUpdate";

const reviewsRoutes: RouteObject[] = [
  {
    path: "/products/item/:productId/reviews",
    element: <ReviewsCreate />,
  },
  {
    path: "/products/item/:productId/commments/:reviewId",
    element: <ReviewsUpdate />,
  },
];

export default reviewsRoutes;
