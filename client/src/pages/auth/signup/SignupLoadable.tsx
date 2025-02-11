import { createLoadableComponent } from "../../../utils/utils.loadable";

const SignupLoadable = createLoadableComponent(() => import("./Signup"));

export default SignupLoadable;
