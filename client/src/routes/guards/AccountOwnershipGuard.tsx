import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { User } from "../../types/user";

const AccountOwnershipGuard = () => {
  const authUserContext = useOutletContext<User>();
  const { username } = useParams();
  if (!authUserContext) return <Navigate to="/" />;

  if (authUserContext.username !== username) return <Navigate to="/" />;
  return <Outlet context={authUserContext} />;
};

export default AccountOwnershipGuard;
