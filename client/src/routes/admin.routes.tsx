import { RouteObject } from "react-router-dom";
import AdminUsers from "../pages/admin/users/AdminUsers";
import AdminProducts from "../pages/admin/products/AdminProducts";
import AdminLayout from "../components/users_/admin/layout/AdminLayout";
import AdminReviews from "../pages/admin/reviews/AdminReviews";
import AdminUser from "../pages/admin/users/AdminUser";

const adminRoutes: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/products", element: <AdminProducts /> },
      { path: "/admin/reviews", element: <AdminReviews /> },
      { path: "/admin/users/:userId", element: <AdminUser /> },
    ],
  },
];

export default adminRoutes;
