import { createLoadableComponent } from "../../../../utils/utils.loadable";

const AddressDirectionUpdateLoadable = createLoadableComponent(
  () => import("./AddressDirectionUpdate")
);

export default AddressDirectionUpdateLoadable;
