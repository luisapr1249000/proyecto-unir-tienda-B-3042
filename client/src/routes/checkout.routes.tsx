import { RouteObject } from "react-router-dom";
import Checkout from "../pages/checkout/Checkout";
const checkoutRoutes: RouteObject[] = [
  {
    path: "/checkout",
    element: <Checkout />,
  },
];

export default checkoutRoutes;
