import { createLoadableComponent } from "../../../utils/utils.loadable";

const ProductUpdateLoadable = createLoadableComponent(
  () => import("./ProductUpdate")
);

export default ProductUpdateLoadable;
