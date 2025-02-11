import { createLoadableComponent } from "../../../utils/utils.loadable";

const CategoryCreateLoadable = createLoadableComponent(
  () => import("./CategoryCreate")
);

export default CategoryCreateLoadable;
