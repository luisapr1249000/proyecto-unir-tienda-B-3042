import { createLoadableComponent } from "../../../../utils/utils.loadable";

const UserAccountOverviewLoadable = createLoadableComponent(
  () => import("./UserAccountOverview")
);

export default UserAccountOverviewLoadable;
