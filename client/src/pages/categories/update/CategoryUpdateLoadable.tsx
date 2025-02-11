import { createLoadableComponent } from "../../../utils/utils.loadable";

const CategoryUpdateLoadable = createLoadableComponent(
  () => import("./CategoryUpdate")
);

export default CategoryUpdateLoadable;
