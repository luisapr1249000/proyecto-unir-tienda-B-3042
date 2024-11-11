import { Navigate, Outlet } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

const ProtectedRoute = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });
  if (!user) return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
