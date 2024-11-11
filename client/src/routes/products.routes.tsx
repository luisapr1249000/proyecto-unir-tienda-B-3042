import { RouteObject } from "react-router-dom";
import ProductCreatePage from "../pages/products/product-create/ProductCreatePage";
import ProductsCategory from "../pages/products/products-category/ProductsCategory";
import ProductItem from "../pages/products/product-item/ProductItem";

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
];

export default productRoutes;
