import { RouteObject } from "react-router-dom";
import AddressDirectionCreate from "../pages/users/address-directions/create/AddressDirectionCreate";
import AddressDirectionUpdate from "../pages/users/address-directions/update/AddressDirectionUpdate";
import AddressDirectionList from "../pages/users/address-directions/list/AddressDirectionList";
import UserCart from "../pages/users/account/cart/UserCart";

const UserCartRoutes: RouteObject[] = [
  {
    path: "cart",
    element: <UserCart />,
  },
  {
    path: "address-directions/create",
    element: <AddressDirectionCreate />,
  },
  {
    path: "users/:userId/address-directions/:addressDirectionId/update",
    element: <AddressDirectionUpdate />,
  },
];

export default UserCartRoutes;
