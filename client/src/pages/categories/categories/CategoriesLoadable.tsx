import { createLoadableComponent } from "../../../utils/utils.loadable";

const CategoriesLoadable = createLoadableComponent(
  () => import("./Categories")
);

export default CategoriesLoadable;
