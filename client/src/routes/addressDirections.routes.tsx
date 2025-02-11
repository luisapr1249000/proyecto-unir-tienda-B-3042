import { RouteObject } from "react-router-dom";
import AddressDirectionListLoadable from "../pages/users/address-directions/list/AddressDirectionListLoadable";
import AddressDirectionCreateLoadable from "../pages/users/address-directions/create/AddressDirectionCreateLoadable";
import AddressDirectionUpdateLoadable from "../pages/users/address-directions/update/AddressDirectionUpdateLoadable";

const addressDirectionRoutes: RouteObject[] = [
  {
    path: "address-directions",
    element: <AddressDirectionListLoadable />,
  },
  {
    path: "address-directions/create",
    element: <AddressDirectionCreateLoadable />,
  },
  {
    path: "address-directions/:addressDirectionId/update",
    element: <AddressDirectionUpdateLoadable />,
  },
];

export default addressDirectionRoutes;
