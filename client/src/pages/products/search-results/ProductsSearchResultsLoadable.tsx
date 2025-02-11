import { createLoadableComponent } from "../../../utils/utils.loadable";

const ProductsSearchResultsLoadable = createLoadableComponent(
  () => import("./ProductsSearchResults")
);

export default ProductsSearchResultsLoadable;
