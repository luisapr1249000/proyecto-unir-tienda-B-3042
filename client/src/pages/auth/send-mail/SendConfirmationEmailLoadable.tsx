import { createLoadableComponent } from "../../../utils/utils.loadable";

const SendConfirmationEmailLoadable = createLoadableComponent(
  () => import("./SendConfirmationEmail")
);

export default SendConfirmationEmailLoadable;
