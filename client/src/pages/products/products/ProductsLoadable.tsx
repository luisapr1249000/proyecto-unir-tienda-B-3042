import { createLoadableComponent } from "../../../utils/utils.loadable";

const ProductsLoadable = createLoadableComponent(() => import("./Products"));

export default ProductsLoadable;
