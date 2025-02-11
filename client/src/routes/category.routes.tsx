import { RouteObject } from "react-router-dom";
import CategoriesLoadable from "../pages/categories/categories/CategoriesLoadable";
import CategoryCreateLoadable from "../pages/categories/create/CategoryCreateLoadable";
import CategoryUpdateLoadable from "../pages/categories/update/CategoryUpdateLoadable";

const categoryRoutes: RouteObject[] = [
  {
    path: "categories",
    element: <CategoriesLoadable />,
  },
  {
    path: "categories/create",
    element: <CategoryCreateLoadable />,
  },
  {
    path: "categories/:categoryId/update",
    element: <CategoryUpdateLoadable />,
  },
];

export default categoryRoutes;
