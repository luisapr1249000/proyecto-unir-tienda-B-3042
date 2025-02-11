import { RouteObject } from "react-router-dom";

import ProductDetailsLoadable from "../pages/products/details/ProductDetailsLoadable";
import ProductUpdateLoadable from "../pages/products/update/ProductUpdateLoadable";
import ProductsLoadable from "../pages/products/products/ProductsLoadable";
import SellersLoadable from "../pages/sellers/SellersLoadable";
import ProductCreateLoadable from "../pages/products/create/ProductCreateLoadable";
import ProductsBySellerLoadable from "../pages/products/products-by-seller/ProductsBySellerLoadable";
import ProductsByCategoryLoadable from "../pages/products/products-by-category/ProductsByCategoryLoadable";
import ProductsSearchResultsLoadable from "../pages/products/search-results/ProductsSearchResultsLoadable";

export const productDetailRoutes: RouteObject[] = [
  {
    path: "/products/details/:productId",
    element: <ProductDetailsLoadable />,
  },
  {
    path: "/products/items/:productId/update",
    element: <ProductUpdateLoadable />,
  },
];

const productRoutes: RouteObject[] = [
  {
    index: true,
    element: <ProductsLoadable />,
  },
  {
    path: "/",
    element: <ProductsLoadable />,
  },
  {
    element: <SellersLoadable />,
    path: "sellers",
  },
  {
    path: "/products",
    element: <ProductsLoadable />,
  },
  {
    path: "products/create",
    element: <ProductCreateLoadable />,
  },
  {
    path: "/products/seller/:username",
    element: <ProductsBySellerLoadable />,
  },

  {
    path: "/products/categories/:categoryName",
    element: <ProductsByCategoryLoadable />,
  },
  {
    path: "/products/search",
    element: <ProductsSearchResultsLoadable />,
  },
];

export default productRoutes;
