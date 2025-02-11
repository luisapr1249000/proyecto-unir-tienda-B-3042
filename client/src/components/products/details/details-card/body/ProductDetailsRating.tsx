import Grid from "@mui/material/Grid2";
import { Rating, Typography } from "@mui/material";
import { ProductProp } from "../../../../../types/product";

const ProductDetailsRating = ({ product }: ProductProp) => (
  <Grid container sx={{}}>
    <Grid size={{ xs: 12 }}>
      <Rating readOnly size="small" value={product.averageReview} />
      <Typography variant="body2" color="textSecondary" gutterBottom>
        ({product.soldCount} Sold)
      </Typography>
    </Grid>
  </Grid>
);
export default ProductDetailsRating;
