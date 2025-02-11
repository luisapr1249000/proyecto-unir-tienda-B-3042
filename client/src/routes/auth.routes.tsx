import { RouteObject } from "react-router-dom";
import GuessRoute from "./guards/GuessRoute";
import AuthLayout from "../components/auth/AuthLayout";
import SignupLoadable from "../pages/auth/signup/SignupLoadable";
import LoginLoadable from "../pages/auth/login/LoginLoadable";
import ForgotPasswordLoadable from "../pages/auth/forgot-password/ForgotPasswordLoadable";
import ResetPasswordLoadable from "../pages/auth/reset-password/ResetPasswordLoadable";
import SendConfirmationEmailLoadable from "../pages/auth/send-mail/SendConfirmationEmailLoadable";

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
            path: "/auth/forgot-password",
            element: <ForgotPasswordLoadable />,
          },

          {
            path: "/auth/reset-password",
            element: <ResetPasswordLoadable />,
          },

          {
            path: "/auth/send-mail-confirmation",
            element: <SendConfirmationEmailLoadable />,
          },
        ],
      },
    ],
  },
];

export default authRoutes;
