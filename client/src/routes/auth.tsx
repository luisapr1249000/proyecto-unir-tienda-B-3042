import { RouteObject } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Signup from "../pages/auth/signup/Signup";
import GuessRoute from "./GuessRoute";

const authRoutes: RouteObject[] = [
  {
    element: <GuessRoute />,
    children: [
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
];

export default authRoutes;
