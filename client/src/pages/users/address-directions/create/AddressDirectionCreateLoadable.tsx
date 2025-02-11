import { createLoadableComponent } from "../../../../utils/utils.loadable";

const AddressDirectionCreateLoadable = createLoadableComponent(
  () => import("./AddressDirectionCreate")
);

export default AddressDirectionCreateLoadable;
