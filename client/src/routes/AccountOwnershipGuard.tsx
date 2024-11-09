import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthUser } from "../hooks/auth";

const AccountOwnershipGuard = () => {
  const { username } = useParams();
  console.log(username);
  const { data: authUser } = useAuthUser();
  if (authUser?.username !== username) return <Navigate to="/" />;
  return <Outlet />;
};

export default AccountOwnershipGuard;
