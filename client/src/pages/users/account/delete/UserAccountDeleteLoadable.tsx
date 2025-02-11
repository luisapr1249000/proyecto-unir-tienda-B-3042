import { createLoadableComponent } from "../../../../utils/utils.loadable";

const UserAccountDeleteLoadable = createLoadableComponent(
  () => import("./UserAccountDelete")
);

export default UserAccountDeleteLoadable;
