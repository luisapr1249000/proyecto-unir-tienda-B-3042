import { RouteObject } from "react-router-dom";
import AddressDirectionCreate from "../pages/users/address-directions/create/AddressDirectionCreate";
import AddressDirectionUpdate from "../pages/users/address-directions/update/AddressDirectionUpdate";
import AddressDirectionList from "../pages/users/address-directions/list/AddressDirectionList";

const addressDirectionRoutes: RouteObject[] = [
  {
    path: "address-directions",
    element: <AddressDirectionList />,
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

export default addressDirectionRoutes;
