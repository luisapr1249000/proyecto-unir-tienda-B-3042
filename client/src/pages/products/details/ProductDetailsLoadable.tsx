import { createLoadableComponent } from "../../../utils/utils.loadable";

const ProductDetailsLoadable = createLoadableComponent(
  () => import("./ProductDetails")
);

export default ProductDetailsLoadable;
