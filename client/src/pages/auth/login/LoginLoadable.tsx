import { createLoadableComponent } from "../../../utils/utils.loadable";

const LoginLoadable = createLoadableComponent(() => import("./Login"));

export default LoginLoadable;
