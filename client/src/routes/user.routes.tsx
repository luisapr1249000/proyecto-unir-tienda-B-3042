import { Link, RouteObject } from "react-router-dom";
import UserAccountUpdate from "../pages/users/account/update/UserAccountUpdate";
import UserAccountLayout from "../components/users_/account/layout/UserAccountLayout";
import UserAccountDelete from "../pages/users/account/delete/UserAccountDelete";
import ChangePassword from "../pages/users/account/change-password/ChangePassword";
import ProtectedRoute from "./guards/ProtectedRoute";
import addressDirectionRoutes from "./addressDirections.routes";
import UserAccountOverview from "../pages/users/account/overview/UserAccountOverview";
import UserWishlist from "../pages/users/account/wishlist/UserWishlist";

const userRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      // {
      //   element: <AccountOwnershipGuard />,
      //   children: [
      {
        element: <UserAccountLayout />,
        path: "users/:username",
        children: [
          { element: <UserAccountUpdate />, index: true },
          { element: <UserAccountUpdate />, path: "update" },
          { element: <ChangePassword />, path: "change-password" },
          { element: <UserAccountDelete />, path: "delete-account" },
          { element: <UserWishlist />, path: "wishlist" },
          {
            element: <UserAccountOverview />,
            path: "overview",
          },
          ...addressDirectionRoutes,
        ],
      },
    ],
  },
];
export default userRoutes;
