import { RouteObject } from "react-router-dom";
import UserAccountLayout from "../components/users_/account/layout/UserAccountLayout";
import ProtectedRoute from "./guards/ProtectedRoute";
import addressDirectionRoutes from "./addressDirections.routes";
import UserAccountUpdateLoadable from "../pages/users/account/update/UserAccountUpdateLoadable";
import ChangePasswordLoadable from "../pages/users/account/change-password/ChangePasswordLoadable";
import UserAccountDeleteLoadable from "../pages/users/account/delete/UserAccountDeleteLoadable";
import UserWishlistLoadable from "../pages/users/account/wishlist/UserWishlistLoadable";
import UserAccountOverviewLoadable from "../pages/users/account/overview/UserAccountOverviewLoadable";

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
          { element: <UserAccountUpdateLoadable />, index: true },
          { element: <UserAccountUpdateLoadable />, path: "update" },
          { element: <ChangePasswordLoadable />, path: "change-password" },
          { element: <UserAccountDeleteLoadable />, path: "delete-account" },
          { element: <UserWishlistLoadable />, path: "wishlist" },
          {
            element: <UserAccountOverviewLoadable />,
            path: "overview",
          },
          ...addressDirectionRoutes,
        ],
      },
    ],
  },
];
export default userRoutes;
