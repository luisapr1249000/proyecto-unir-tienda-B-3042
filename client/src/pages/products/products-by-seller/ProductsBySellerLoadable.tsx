import { createLoadableComponent } from "../../../utils/utils.loadable";

const ProductsBySellerLoadable = createLoadableComponent(
  () => import("./ProductsBySeller")
);

export default ProductsBySellerLoadable;
