import { createLoadableComponent } from "../../../utils/utils.loadable";

const ProductCreateLoadable = createLoadableComponent(
  () => import("./ProductCreate")
);

export default ProductCreateLoadable;
