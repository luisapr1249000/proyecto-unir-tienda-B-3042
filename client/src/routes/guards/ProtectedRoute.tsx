import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth";

const ProtectedRoute = () => {
  const { isSuccess, isLoading, isError, error } = useAuthUser();
  if ((!isSuccess || Boolean(error) || isError) && !isLoading)
    return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoute;
