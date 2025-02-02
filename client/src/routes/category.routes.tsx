import { Link, RouteObject } from "react-router-dom";
import { createLoadableComponent } from "../utils/utils.loadable";

const CategoriesLoadable = createLoadableComponent(
  () => import("../pages/categories/categories/Categories")
);

const CategoryCreateLoadable = createLoadableComponent(
  () => import("../pages/categories/create/CategoryCreate")
);

const CategoryUpdateLoadable = createLoadableComponent(
  () => import("../pages/categories/update/CategoryUpdate")
);

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
