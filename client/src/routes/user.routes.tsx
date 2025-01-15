import { Link, RouteObject } from "react-router-dom";
// import UserAccount from "../pages/user-account/UserAccount";
// import AccountOwnershipGuard from "./guards/AccountOwnershipGuard";
// import UserAccountUpdate from "../pages/user-account/user-account-update/UserAccountUpdate";
// import ProtectedRoute from "./guards/ProtectedRoute";
// import UserAddressDirections from "../pages/user-account/user-address-directions/UserAddressDirections";
// import UserAddressDirectionCreate from "../components/users/account/user-address-direction-create/UserAddressDirectionCreate";
// import UserAccountGeneralInformation from "../pages/user-account/user-account-general-information/UserAccountGeneralInformation";
// import UserAccountWishlist from "../pages/user-account/user-account-wishlist/UserAccountWishlist";
// import UserAccountCart from "../pages/user-account/user-account-cart/UserAccountCart";
// import UserAccountSavedProducts from "../pages/user-account/user-account-saved-products/UserAccountSavedProducts";
// import { createLoadable } from "../utils/utils.loadable";
import GridLoadingSkeleton from "../components/common/load-spinner/GridLoadingSkeleton";
// import UserDelete from "../pages/user-account/user-edit-account/UserEditAccount";
// import UserEditAccount from "../pages/user-account/user-edit-account/UserEditAccount";
// import UserDeleteAccount from "../pages/user-account/user-delete-account/UserDeleteAccount";
import UserAccountUpdate from "../pages/users/account/update/UserAccountUpdate";
import UserAccountLayout from "../components/users_/account/layout/UserAccountLayout";
import UserAccountDelete from "../pages/users/account/delete/UserAccountDelete";
import ChangePassword from "../pages/users/account/change-password/ChangePassword";
import ProtectedRoute from "./guards/ProtectedRoute";

const loadableOptions = { fallback: <GridLoadingSkeleton /> };

const userRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      // {
      //   element: <AccountOwnershipGuard />,
      //   children: [
      {
        element: <UserAccountLayout />,
        path: "account/:username",
        children: [
          { element: <UserAccountUpdate />, index: true },
          { element: <UserAccountUpdate />, path: "update" },
          { element: <ChangePassword />, path: "change-password" },
          { element: <UserAccountDelete />, path: "delete-account" },
        ],
      },
    ],
  },
  // children: [
  //   { element: <UserAccountUpdate />, index: true },
  //   { element: <UserAccountUpdate />, path: "update" },
  //   { element: <UserEditAccount />, path: "edit-account" },
  //   { element: <UserDeleteAccount />, path: "delete-account" },
  //   {
  //     element: <UserAccountGeneralInformation />,
  //     path: "general-information",
  //   },
  //   {
  //     element: <UserAccountWishlistLoadable />,
  //     path: "wishlist",
  //   },
  //   {
  //     element: <UserAccountCartLoadable />,
  //     path: "cart",
  // },
  // ],}
  // },
  // ],
  // },
  // ],
  // },
  // {
  //   path: "account/:username",
  //   element: <UserAccount />,
  // },
  // {
  //   element: <UserAccountLayout />,
  //   children: [
  //     {
  //       path: "account/:username/update",
  //       element: <UserAccountUpdate />,
  //     },
  //   ],
  // },
  // {
  //   element: <UserAddressDirectionCreate />,
  //   path: "/user/address-direction/create",
  // },
];
export default userRoutes;
