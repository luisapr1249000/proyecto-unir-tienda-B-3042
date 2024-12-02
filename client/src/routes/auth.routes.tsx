import { RouteObject } from "react-router-dom";
// import Login from "../pages/auth/login/Login";
// import Signup from "../pages/auth/signup/Signup";
import GuessRoute from "./guards/GuessRoute";
// import ResetPasswordConfirmation from "../pages/auth/reset-password-confirmation/ResetPasswordConfirmation";
// import SendMailConfirmation from "../pages/auth/send-mail-confirmation/SendMailConfirmation";
// import LoadSpinner from "../components/common/load-spinner/LoadSpinner";
import {
  createLoadableComponent,
  loadableOptions,
} from "../utils/utils.loadable";
import pMinDelay from "p-min-delay";
import AuthLayout from "../components/auth/AuthLayout";

const SignupLoadable = createLoadableComponent(
  () => import("../pages/auth/signup/Signup")
);

const LoginLoadable = createLoadableComponent(
  () => import("../pages/auth/login/Login")
);

const ResetPasswordConfirmationLoadable = createLoadableComponent(
  () =>
    import(
      "../pages/auth/reset-password-confirmation/ResetPasswordConfirmation"
    )
);

const SendMailConfirmationLoadable = createLoadableComponent(
  () => import("../pages/auth/send-mail-confirmation/SendMailConfirmation")
);

const authRoutes: RouteObject[] = [
  {
    element: <GuessRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/signup",
            element: <SignupLoadable />,
          },
          {
            path: "/auth/login",
            element: <LoginLoadable />,
          },
          {
            path: "/auth/reset-password",
            element: <ResetPasswordConfirmationLoadable />,
          },
          {
            path: "/auth/send-mail-confirmation",
            element: <SendMailConfirmationLoadable />,
          },
        ],
      },
    ],
  },
];

export default authRoutes;
