import { RouteObject } from "react-router-dom";
import ProductCreatePage from "../pages/products/product-create/ProductCreatePage";
import ProductsCategory from "../pages/products/products-category/ProductsCategory";
import ProductItem from "../pages/products/product-item/ProductItem";
import ProductUpdate from "../pages/products/product-update/ProductUpdate";
import ProductsSearchResults from "../pages/products/product-search-results/ProductsSearchResults";

const productRoutes: RouteObject[] = [
  {
    path: "product-create",
    element: <ProductCreatePage />,
  },
  {
    path: "/products/category/:categoryName",
    element: <ProductsCategory />,
  },
  {
    path: "/products/item/:productId",
    element: <ProductItem />,
  },
  {
    path: "/products/item/:productId/update",
    element: <ProductUpdate />,
  },
  {
    path: "/products/search/:searchProduct",
    element: <ProductsSearchResults />,
  },
];

export default productRoutes;
