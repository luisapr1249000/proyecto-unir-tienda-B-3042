import { createLoadableComponent } from "../../../../utils/utils.loadable";

const AddressDirectionListLoadable = createLoadableComponent(
  () => import("./AddressDirectionList")
);

export default AddressDirectionListLoadable;
