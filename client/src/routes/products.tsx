import { RouteObject } from "react-router-dom";
import ProductCreatePage from "../pages/products/product-create/ProductCreatePage";

const productRoutes: RouteObject[] = [
  {
    path: "product-create",
    element: <ProductCreatePage />,
  },
];

export default productRoutes;
