import { createLoadableComponent } from "../../../utils/utils.loadable";

const ProductsByCategoryLoadable = createLoadableComponent(
  () => import("./ProductsCategory")
);

export default ProductsByCategoryLoadable;
