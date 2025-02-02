import { RouteObject } from "react-router-dom";
import { createLoadableComponent } from "../utils/utils.loadable";

const AddressDirectionListLoadable = createLoadableComponent(
  () => import("../pages/users/address-directions/list/AddressDirectionList")
);

const AddressDirectionCreateLoadable = createLoadableComponent(
  () =>
    import("../pages/users/address-directions/create/AddressDirectionCreate")
);

const AddressDirectionUpdateLoadable = createLoadableComponent(
  () =>
    import("../pages/users/address-directions/update/AddressDirectionUpdate")
);

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
