import { createLoadableComponent } from "../../utils/utils.loadable";

const SellersLoadable = createLoadableComponent(() => import("./Sellers"));

export default SellersLoadable;
