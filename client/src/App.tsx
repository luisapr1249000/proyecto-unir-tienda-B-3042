// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import GuessRoute from "./routes/GuessRoute";
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "./api/auth.api";
import BaseLayout from "./components/layout/base-layout/BaseLayout";
import authRoutes from "./routes/auth";
import { useAuthUser } from "./hooks/auth";
import { ToastContainer } from "react-toastify";
import userRoutes from "./routes/user";
import productRoutes from "./routes/products";

function App() {
  const { data: authUser, error } = useAuthUser();

  const router = createBrowserRouter([
    {
      element: <BaseLayout />,
      path: "",
      children: [],
    },
    ...authRoutes,
    ...userRoutes,
    ...productRoutes,
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
