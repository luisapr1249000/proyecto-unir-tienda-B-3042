import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authRoutes from "./routes/auth.routes";
import { ToastContainer } from "react-toastify";
import userRoutes from "./routes/user.routes";
import productRoutes, { productDetailRoutes } from "./routes/products.routes";
import categoryRoutes from "./routes/category.routes";
import { useServerStatus } from "./hooks/server.hook";
import reviewsRoutes from "./routes/review.routes";
import ProductLayout from "./components/products/ProductsLayout";
import ProductDetailLayout from "./components/products/details/ProductDetailLayout";
import userCartRoutes from "./routes/userCart.routes";
import checkoutRoutes from "./routes/checkout.routes";
import CircleLoadingGrid from "./components/common/loaders/CircleLoadingGrid";
import ServerDownMessage from "./components/common/server-down-message/ServerDownMessage";
import { Helmet } from "react-helmet";

function App() {
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
    ...authRoutes,
    ...userRoutes,
    ...reviewsRoutes,
    ...userCartRoutes,
    ...checkoutRoutes,
  ]);

  const serverDown =
    !isLoading && (isError || Boolean(serverError) || !isSuccess);
  if (isLoading) return <CircleLoadingGrid />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tienda B3042</title>
        <meta
          name="description"
          content="Shop the best products at Tienda B3042. Find great deals, top brands, and exclusive offers."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
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
