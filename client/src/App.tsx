import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./components/layout/base-layout/BaseLayout";
import authRoutes from "./routes/auth.routes";
import { useAuthUser } from "./hooks/auth";
import { ToastContainer } from "react-toastify";
import userRoutes from "./routes/user.routes";
import productRoutes, { productDetailRoutes } from "./routes/products.routes";
import categoryRoutes from "./routes/category.routes";
import { useServerStatus } from "./hooks/server.hook";
// import ServerDownMessage from "./components/common/server-down-message/ServerDownMessage";
// import LoadSpinner from "./components/common/load-spinner/LoadSpinner";
import { useNavigatorOnLine } from "./hooks/navigatorOnLine.hooks";
import { useEffect } from "react";

// import NetworkStatusIndicator from "./components/network/network-status-indicator/NetworkStatusIndicator";
import NetworkOffline from "./components/network/network-offline/NetworkOffline";
import adminRoutes from "./routes/admin.routes";
import reviewsRoutes from "./routes/review.routes";
import addressDirectionRoutes from "./routes/addressDirections.routes";
import ProductLayout from "./components/products_/ProductsLayout";
import ProductDetailLayout from "./components/products_/details/ProductDetailLayout";

function App() {
  const isOnline = useNavigatorOnLine();
  const { data: authUser, error: authError } = useAuthUser();
  const {
    isLoading,
    refetch,
    isSuccess,
    isError,
    error: serverError,
  } = useServerStatus();

  const router = createBrowserRouter([
    {
      element: <ProductLayout />,
      // path: "",
      children: [...productRoutes, ...categoryRoutes],
    },
    {
      element: <ProductDetailLayout />,
      children: [...productDetailRoutes],
    },
    ...adminRoutes,
    ...authRoutes,
    ...userRoutes,
    ...reviewsRoutes,
  ]);

  if (!isOnline) return <NetworkOffline />;

  const serverDown =
    !isLoading && (isError || Boolean(serverError) || !isSuccess);
  // if (isLoading) return <LoadSpinner isBackdrop />;
  return (
    <>
      {/* {isOnline}
      {serverDown ? (
        <ServerDownMessage onRetry={refetch} />
      ) : ( */}
      <>
        <ToastContainer />
        <RouterProvider router={router} />
      </>
      {/* )} */}
    </>
  );
}

export default App;
