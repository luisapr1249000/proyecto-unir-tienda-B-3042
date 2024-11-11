// import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./components/layout/base-layout/BaseLayout";
import authRoutes from "./routes/auth.routes";
import { useAuthUser } from "./hooks/auth";
import { ToastContainer } from "react-toastify";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/products.routes";
import categoryRoutes from "./routes/category.routes";

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
    ...categoryRoutes,
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
