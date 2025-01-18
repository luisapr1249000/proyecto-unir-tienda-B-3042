import { Link, RouteObject } from "react-router-dom";
import CategoryCreate from "../pages/categories/create/CategoryCreate";
import CategoryUpdate from "../pages/categories/update/CategoryUpdate";
import Categories from "../pages/categories/categories/Categories";

const categoryRoutes: RouteObject[] = [
  {
    path: "categories",
    element: <Categories />,
  },
  {
    path: "categories/create",
    element: <CategoryCreate />,
  },
  {
    path: "categories/:categoryId/update",
    element: <CategoryUpdate />,
  },
];

export default categoryRoutes;
