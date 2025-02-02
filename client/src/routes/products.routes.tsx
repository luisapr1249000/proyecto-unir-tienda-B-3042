import { RouteObject } from "react-router-dom";
import ProductsCategory from "../pages/products/products-by-category/ProductsCategory";
import Products from "../pages/products/products/Products";
import ProductDetails from "../pages/products/details/ProductDetails";
import ProductCreate from "../pages/products/create/ProductCreate";
import ProductUpdate from "../pages/products/update/ProductUpdate";
import ProductsBySeller from "../pages/products/products-by-seller/ProductsBySeller";
import ProductsSearchResults from "../pages/products/search-results/ProductsSearchResults";
import Sellers from "../pages/sellers/Sellers";

export const productDetailRoutes: RouteObject[] = [
  {
    path: "/products/details/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/products/items/:productId/update",
    element: <ProductUpdate />,
  },
];

const productRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Products />,
  },
  {
    element: <Sellers />,
    path: "sellers",
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "products/create",
    element: <ProductCreate />,
  },
  {
    path: "/products/seller/:username",
    element: <ProductsBySeller />,
  },

  {
    path: "/products/categories/:categoryName",
    element: <ProductsCategory />,
  },
  {
    path: "/products/search",
    element: <ProductsSearchResults />,
  },
];

export default productRoutes;
