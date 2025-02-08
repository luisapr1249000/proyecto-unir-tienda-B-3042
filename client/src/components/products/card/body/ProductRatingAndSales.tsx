import Grid from "@mui/material/Grid2";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const ProductRatingsAndSales = ({
  averageReview,
  soldCount,
}: {
  averageReview: number;
  soldCount: number;
}) => (
  <Grid
    container
    spacing={1}
    sx={{ alignItems: "center", justifyContent: "flex-start" }}
  >
    <Tooltip title="Average Review">
      <Rating value={averageReview} size="small" readOnly />
    </Tooltip>
    <Typography color="textSecondary" variant="caption">
      {soldCount ?? 0} Sold
    </Typography>
  </Grid>
);

export default ProductRatingsAndSales;
