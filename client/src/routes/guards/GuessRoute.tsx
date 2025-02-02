import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth";
import { useQueryClient } from "@tanstack/react-query";

const GuessRoute = () => {
  const query = useQueryClient();
  const { data: authUser, error } = useAuthUser();
  console.log(12341234);
  console.log("error", error);
  console.log("authUser", authUser);
  console.log("is auth user === null", authUser === null);
  console.log("is auth user === undefined", authUser === undefined);
  if (error) {
    query.setQueryData(["authUser"], null);
  }

  if (authUser && !error) return <Navigate to="/" />;

  return <Outlet />;
};

export default GuessRoute;
