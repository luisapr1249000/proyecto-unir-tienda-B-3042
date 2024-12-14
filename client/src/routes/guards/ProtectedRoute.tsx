import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth";
import LoadSpinner from "../../components/common/load-spinner/LoadSpinner";

const ProtectedRoute = () => {
  const { data: authUser, isLoading, isError } = useAuthUser();
  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) return <Navigate to="/" />;
  return <Outlet context={authUser} />;
};

export default ProtectedRoute;
