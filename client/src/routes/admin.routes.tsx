import { RouteObject } from "react-router-dom";
import AdminLayout from "../components/users/admin/admin-layout/AdminLayout";
import AdminUserTable from "../components/users/admin/admin-user-table/AdminUserTable";
import AdminUsers from "../pages/admin/users/AdminUsers";
import AdminProducts from "../pages/admin/products/AdminProducts";

const adminRoutes: RouteObject[] = [
  {
    element: <AdminLayout />,
    children: [
      { path: "/admin/users", element: <AdminUsers /> },
      { path: "/admin/products", element: <AdminProducts /> },
    ],
  },
];

export default adminRoutes;
