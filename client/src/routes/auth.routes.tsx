import { RouteObject } from "react-router-dom";
import GuessRoute from "./guards/GuessRoute";
import { createLoadableComponent } from "../utils/utils.loadable";
import AuthLayout from "../components/auth/AuthLayout";

const SignupLoadable = createLoadableComponent(
  () => import("../pages/auth/signup/Signup")
);

const LoginLoadable = createLoadableComponent(
  () => import("../pages/auth/login/Login")
);

const ForgotPasswordLoadable = createLoadableComponent(
  () => import("../pages/auth/forgot-password/ForgotPassword")
);

const ResetPasswordLoadable = createLoadableComponent(
  () => import("../pages/auth/reset-password/ResetPassword")
);

const SendConfirmationEmailLoadable = createLoadableComponent(
  () => import("../pages/auth/send-mail/SendConfirmationEmail")
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
