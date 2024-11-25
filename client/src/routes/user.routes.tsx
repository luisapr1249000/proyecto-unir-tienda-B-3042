import { Link, RouteObject } from "react-router-dom";
import UserAccount from "../pages/user-account/UserAccount";
import AccountOwnershipGuard from "./guards/AccountOwnershipGuard";
import UserAccountUpdate from "../pages/user-account/user-account-update/UserAccountUpdate";
import ProtectedRoute from "./guards/ProtectedRoute";
import UserAddressDirections from "../pages/user-account/user-address-directions/UserAddressDirections";
import UserAddressDirectionCreate from "../components/users/account/user-address-direction-create/UserAddressDirectionCreate";
import UserAccountLayout from "../components/users/account/layout/UserAccountLayout";
import UserAccountGeneralInformation from "../pages/user-account/user-account-general-information/UserAccountGeneralInformation";
import UserAccountWishlist from "../pages/user-account/user-account-wishlist/UserAccountWishlist";
import UserAccountCart from "../pages/user-account/user-account-cart/UserAccountCart";
import UserAccountSavedProducts from "../pages/user-account/user-account-saved-products/UserAccountSavedProducts";
import { createLoadable } from "../utils/utils.loadable";
import GridLoadingSkeleton from "../components/common/load-spinner/GridLoadingSkeleton";

const loadableOptions = { fallback: <GridLoadingSkeleton /> };

const UserAccountCartLoadable = createLoadable(
  () => import("../pages/user-account/user-account-cart/UserAccountCart"),
  200,
  loadableOptions
);

const UserAccountWishlistLoadable = createLoadable(
  () =>
    import("../pages/user-account/user-account-wishlist/UserAccountWishlist")
);

const UserAccountSavedProductsLoadable = createLoadable(
  () =>
    import(
      "../pages/user-account/user-account-saved-products/UserAccountSavedProducts"
    )
);

const userRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AccountOwnershipGuard />,
        children: [
          {
            element: <UserAccountLayout />,
            path: "account/:username",
            children: [
              { element: <UserAccountUpdate />, index: true },
              { element: <UserAccountUpdate />, path: "update" },
              {
                element: <UserAccountGeneralInformation />,
                path: "general-information",
              },
              {
                element: <UserAccountWishlistLoadable />,
                path: "wishlist",
              },
              {
                element: <UserAccountCartLoadable />,
                path: "cart",
              },
              {
                element: <UserAccountSavedProductsLoadable />,
                path: "saved-products",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "account/:username",
    element: <UserAccount />,
  },
  {
    element: <UserAccountLayout />,
    children: [
      {
        path: "account/:username/update",
        element: <UserAccountUpdate />,
      },
    ],
  },
  {
    element: <UserAddressDirectionCreate />,
    path: "/user/address-direction/create",
  },
];
export default userRoutes;
