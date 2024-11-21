import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./components/layout/base-layout/BaseLayout";
import authRoutes from "./routes/auth.routes";
import { useAuthUser } from "./hooks/auth";
import { ToastContainer } from "react-toastify";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/products.routes";
import categoryRoutes from "./routes/category.routes";
import { useServerStatus } from "./hooks/server.hook";
import ServerDownMessage from "./components/common/server-down-message/ServerDownMessage";
import LoadSpinner from "./components/common/load-spinner/LoadSpinner";

function App() {
  const { data: authUser, error } = useAuthUser();
  const { isLoading, refetch, isSuccess, isError } = useServerStatus();

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

  const serverDown = isError || Boolean(error) || !isSuccess;
  if (isLoading) return <LoadSpinner isBackdrop />;

  return (
    <>
      {serverDown ? (
        <ServerDownMessage onRetry={refetch} />
      ) : (
        <>
          <ToastContainer />
          <RouterProvider router={router} />
        </>
      )}
    </>
  );
}

export default App;
