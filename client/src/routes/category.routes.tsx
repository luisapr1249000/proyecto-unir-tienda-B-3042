import { Link, RouteObject } from "react-router-dom";
import CategoryCreate from "../pages/categories/category-create/CategoryCreate";
import CategoryUpdate from "../pages/categories/category-update/CategoryUpdate";
import Categories from "../pages/categories/catogories/Categories";

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
    path: "categories/update/:categoryId",
    element: <CategoryUpdate />,
  },
];

export default categoryRoutes;
