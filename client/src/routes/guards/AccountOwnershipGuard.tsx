import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useAuthUser } from "../../hooks/auth";

const AccountOwnershipGuard = () => {
  const { username } = useParams();
  const { data: authUser, isLoading } = useAuthUser();
  if (!isLoading && authUser?.username !== username) return <Navigate to="/" />;
  return <Outlet context={authUser} />;
};

export default AccountOwnershipGuard;
