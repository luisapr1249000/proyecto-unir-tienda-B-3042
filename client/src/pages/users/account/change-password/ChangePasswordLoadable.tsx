import { createLoadableComponent } from "../../../../utils/utils.loadable";

const ChangePasswordLoadable = createLoadableComponent(
  () => import("./ChangePassword")
);

export default ChangePasswordLoadable;
