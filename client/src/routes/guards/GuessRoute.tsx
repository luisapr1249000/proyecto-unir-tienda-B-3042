import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth";

const GuessRoute = () => {
  const { data: user, isSuccess } = useAuthUser();
  console.log("USER - GUESS :", user);
  if (isSuccess) return <Navigate to="/" />;
  return <Outlet />;
};

export default GuessRoute;
