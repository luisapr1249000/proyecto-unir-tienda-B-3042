import { RouteObject } from "react-router-dom";
import UserCart from "../pages/users/account/cart/UserCart";
import UserCartLayout from "../components/users_/account/cart/UserCartLayout";

const UserCartRoutes: RouteObject[] = [
  {
    element: <UserCartLayout />,
    children: [
      {
        path: "users/:username/cart",
        element: <UserCart />,
      },
    ],
  },
];

export default UserCartRoutes;
