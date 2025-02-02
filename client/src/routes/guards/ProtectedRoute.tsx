import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth";
import { useQueryClient } from "@tanstack/react-query";
import LoadSpinner from "../../components/common/load-spinner/LoadSpinner";

const ProtectedRoute = () => {
  const queryClient = useQueryClient();
  const { data: authUser, isLoading, isError, error } = useAuthUser();
  if (isLoading) {
    return <LoadSpinner />;
  }

  if (
    authUser === undefined ||
    !authUser ||
    !authUser._id ||
    authUser === null ||
    isError ||
    error
  ) {
    console.log(error);
    queryClient.invalidateQueries({ queryKey: ["authUser"] });
    return <Navigate to="/" />;
  }

  return <Outlet context={authUser} />;
};

export default ProtectedRoute;
