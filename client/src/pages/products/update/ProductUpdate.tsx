import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { useGetProductById } from "../../../hooks/products.hooks";
import { useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/products_/update/ProductUpdateForm";
import { ProductId } from "../../../types/product";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";

const ProductUpdate = () => {
  const { productId } = useParams() as ProductId;
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId });

  if (isLoading) return <CircleLoadingGrid />;
  if (error) return <ObjectNotFound onReload={refetch} object="Product" />;
  if (!product) return <ObjectNotFound onReload={refetch} object="Product" />;
  return (
    <Grid container sx={{ ...gridContainerCenter }}>
      <Grid container spacing={3} size={{ xs: 10 }} sx={{ border: 1, p: 3 }}>
        <Grid>
          <Typography variant="h5">Post A New Product!</Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <ProductUpdateForm product={product} />
      </Grid>
    </Grid>
  );
};

export default ProductUpdate;
