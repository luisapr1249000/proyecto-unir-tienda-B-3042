import { createLoadableComponent } from "../../../utils/utils.loadable";

const ResetPasswordLoadable = createLoadableComponent(
  () => import("./ResetPassword")
);

export default ResetPasswordLoadable;
