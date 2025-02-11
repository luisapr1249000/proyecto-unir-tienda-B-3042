import { RouteObject } from "react-router-dom";
import ReviewCreateLoadable from "../pages/reviews/create/ReviewCreateLoadable";
import ReviewUpdateLoadable from "../pages/reviews/update/ReviewUpdateLoadable";

const reviewsRoutes: RouteObject[] = [
  {
    path: "/products/item/:productId/reviews",
    element: <ReviewCreateLoadable />,
  },
  {
    path: "/products/item/:productId/reviews/:reviewId",
    element: <ReviewUpdateLoadable />,
  },
];

export default reviewsRoutes;
