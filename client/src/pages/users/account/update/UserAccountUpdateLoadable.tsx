import { createLoadableComponent } from "../../../../utils/utils.loadable";

const UserAccountUpdateLoadable = createLoadableComponent(
  () => import("./UserAccountUpdate")
);

export default UserAccountUpdateLoadable;
