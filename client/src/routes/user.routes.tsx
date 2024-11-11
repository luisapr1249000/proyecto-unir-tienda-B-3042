import { Link, RouteObject } from "react-router-dom";
import UserAccount from "../pages/user-account/UserAccount";
import AccountOwnershipGuard from "./guards/AccountOwnershipGuard";
import UserAccountUpdate from "../pages/user-account/user-account-update/UserAccountUpdate";
import ProtectedRoute from "./guards/ProtectedRoute";
import UserAddressDirections from "../pages/user-account/user-address-directions/UserAddressDirections";
import UserAddressDirectionCreate from "../components/users/account/user-address-direction-create/UserAddressDirectionCreate";

const userRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/:username",
        element: <AccountOwnershipGuard />,
        handle: {
          crumb: (username: string) => (
            <Link to={`/account/${username}`}>Account</Link>
          ),
        },

        children: [
          {
            index: true,
            element: <UserAccount />,
          },
          {
            path: "update",
            element: <UserAccountUpdate />,
            handle: {
              crumb: (username: string) => (
                <Link to={`/account/${username}`}>Account</Link>
              ),
            },
          },
          {
            path: "Address-Directions",
            element: <UserAddressDirections />,
            handle: {
              crumb: (username: string) => (
                <Link to={`/account/${username}`}>Account</Link>
              ),
            },
          },
        ],
      },
    ],
  },
  {
    element: <UserAddressDirectionCreate />,
    path: "/user/address-direction/create",
  },
];
export default userRoutes;
