import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import { useGetProductById } from "../../../hooks/products.hooks";
import { ProductId } from "../../../types/product";
import ProductItemCard from "../../../components/products/product-item/product-item-card/ProductItemCard";
import ObjectNotFound from "../../../components/common/object-not-found/ObjectNotFound";
import ProductAskQuestionForm from "../../../components/products/product-questions/ProductAskQuestionForm";
import ProductQuesionSection from "../../../components/products/product-questions/ProductQuesionSection";
import ProductItemReviews from "../../../components/products/product-item/ProductItemReview";
import ProductItemSkeleton from "../../../components/products/product-item/ProductItemSkeleton";
import ProductSpecificationts from "../../../components/products/product-specificationts/ProductSpecificationts";

const ProductItem = () => {
  const { productId } = useParams() as ProductId;
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductById({ productId });

  if (isLoading) return <ProductItemSkeleton />;

  if (error || !product)
    return <ObjectNotFound onReload={refetch} object="Product" />;

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        pb: 5,
        pt: 5,
      }}
      spacing={3}
    >
      {product && (
        <>
          <ProductItemCard product={product} />
          <ProductSpecificationts product={product} />
          <Grid
            component={Card}
            variant="outlined"
            size={{ xs: 11 }}
            // sx={{ height: 100 }}
          >
            <CardContent>
              <Typography variant="h5">Q&A</Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <ProductAskQuestionForm productId={product._id} />
            </CardContent>
            <Divider />
            <ProductQuesionSection product={product} />
          </Grid>
          <Card size={{ xs: 11 }} component={Grid} variant="outlined">
            <CardContent>
              <Typography>Reviews</Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <ProductItemReviews productId={product._id} />
            </CardContent>
          </Card>
        </>
      )}
    </Grid>
  );
};

export default ProductItem;
