import { RouteObject } from "react-router-dom";
import ProductsCategory from "../pages/products/products-by-category/ProductsCategory";
import ProductItem from "../pages/products/product-item/ProductItem";
import ProductsSearchResults from "../pages/products/product-search-results/ProductsSearchResults";
import Products from "../pages/products/products/Products";
import ProductDetails from "../pages/products/details/ProductDetails";
import ProductCreate from "../pages/products/create/ProductCreate";
import ProductUpdate from "../pages/products/update/ProductUpdate";
import ProductsBySeller from "../pages/products/products-by-seller/ProductsBySeller";

const productRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Products />,
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
    path: "/products/seller/:userId",
    element: <ProductsBySeller />,
  },

  {
    path: "/products/category/:categoryName",
    element: <ProductsCategory />,
  },
  {
    path: "/products/details/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/products/items/:productId/update",
    element: <ProductUpdate />,
  },
  // {
  //   path: "/products/search/:searchProduct",
  //   element: <ProductsSearchResults />,
  // },
];

export default productRoutes;
