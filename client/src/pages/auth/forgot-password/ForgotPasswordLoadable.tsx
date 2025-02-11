import { createLoadableComponent } from "../../../utils/utils.loadable";

const ForgotPasswordLoadable = createLoadableComponent(
  () => import("./ForgotPassword")
);

export default ForgotPasswordLoadable;
