import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRoutes from "./routes/auth.routes";
import { useAuthUser, useGetAuthUser } from "./hooks/auth";
import { ToastContainer } from "react-toastify";
import userRoutes from "./routes/user.routes";
import productRoutes, { productDetailRoutes } from "./routes/products.routes";
import categoryRoutes from "./routes/category.routes";
import { useServerStatus } from "./hooks/server.hook";
import { useNavigatorOnLine } from "./hooks/navigatorOnLine.hooks";
import adminRoutes from "./routes/admin.routes";
import reviewsRoutes from "./routes/review.routes";
import ProductLayout from "./components/products/ProductsLayout";
import ProductDetailLayout from "./components/products/details/ProductDetailLayout";
import UserCartRoutes from "./routes/userCart.routes";

function App() {
  const isOnline = useNavigatorOnLine();
  const { data: authUser } = useAuthUser();
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
      children: [...productRoutes],
    },
    {
      element: <ProductDetailLayout />,
      children: [...productDetailRoutes, ...categoryRoutes],
    },
    // ...adminRoutes,
    ...authRoutes,
    ...userRoutes,
    ...reviewsRoutes,
    ...UserCartRoutes,
  ]);

  // if (!isOnline) return <NetworkOffline />;

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
