import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { ProductId } from "../../../types/product";
import { useGetProductById } from "../../../hooks/products.hooks";
import ProductDetailsCard from "../../../components/products/details/details-card/ProductDetails";
import ProductQuestions from "../../../components/products/details/questions/ProductQuestions";
import ProductSpecificationts from "../../../components/products/details/specifications/ProductSpecificationts";
import ProductReviewList from "../../../components/reviews/list/ProductReviewList";
import ProductDetailSkeleton from "../../../components/products/skeleton/ProductDetailSkeleton";
import { useAuthUser } from "../../../hooks/auth";
import { GridObjectNotFound } from "../../../components/common/errors/object-not-found/ObjectNotFound";
import ProductDetailsHelmet from "./ProductDetailsHelmet";

const ProductDetails = () => {
  const { productId } = useParams() as ProductId;
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId });

  const { data: authUser } = useAuthUser();
  const isAuthor = authUser && authUser._id === product?.author?._id;

  if (isLoading) return <ProductDetailSkeleton />;
  if (error) return <GridObjectNotFound onReload={refetch} object="Product" />;
  if (!product)
    return <GridObjectNotFound onReload={refetch} object="Product" />;

  return (
    <>
      <ProductDetailsHelmet
        productName={product.name}
        productDescription={product.description}
      />
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 0, md: 3 },
        }}
        spacing={3}
      >
        <ProductDetailsCard product={product} />
        <ProductSpecificationts product={product} />
        <ProductQuestions
          productId={product._id}
          questions={product.productQuestions ?? []}
          isAuthor={isAuthor}
        />
        <ProductReviewList productId={product._id} />
      </Grid>
    </>
  );
};

export default ProductDetails;
