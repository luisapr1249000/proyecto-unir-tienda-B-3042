import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { Card } from "@mui/material";
import { useGetProductById } from "../../../hooks/products.hooks";
import { useParams } from "react-router-dom";
import ReviewCreateForm from "../../../components/reviews/create/ReviewCreateForm";
import ProductCard from "../../../components/products/card/ProductCard";
import { GridObjectNotFound } from "../../../components/common/errors/object-not-found/ObjectNotFound";
import BackdropLoading from "../../../components/common/loaders/BackdropLoading";
import ReviewCreateHelmet from "./ReviewCreateHelmet";
const ReviewCreate = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId: productId ?? "" });

  if (isLoading) return <BackdropLoading />;
  if (error) return <GridObjectNotFound object="Product" onReload={refetch} />;
  if (!product)
    return <GridObjectNotFound object="Product" onReload={refetch} />;

  return (
    <>
      <ReviewCreateHelmet />
      <Grid sx={{ ...gridContainerCenter }}>
        <Grid
          container
          spacing={3}
          sx={{ p: 3 }}
          component={Card}
          variant="outlined"
        >
          <ProductCard product={product} />
          <ReviewCreateForm productId={product._id} />
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewCreate;
