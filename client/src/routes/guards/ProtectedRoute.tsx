import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth";
import { useQueryClient } from "@tanstack/react-query";
import BackdropLoading from "../../components/common/loaders/BackdropLoading";

const ProtectedRoute = () => {
  const queryClient = useQueryClient();
  const { data: authUser, isLoading, isError, error } = useAuthUser();
  if (isLoading) {
    return <BackdropLoading />;
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
