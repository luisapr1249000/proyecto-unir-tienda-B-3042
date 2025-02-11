import { createLoadableComponent } from "../../../../utils/utils.loadable";

const UserCartLoadable = createLoadableComponent(() => import("./UserCart"));

export default UserCartLoadable;
