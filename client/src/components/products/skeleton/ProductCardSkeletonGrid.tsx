import Grid from "@mui/material/Grid2";
import { Card, CardContent, Skeleton } from "@mui/material";
import { Divider, Typography } from "@mui/material";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductCardSkeletonGrid = ({ count = 12 }: { count?: number }) => (
  <Grid direction="row" container spacing={3} sx={{ p: 3 }}>
    <Card elevation={4} sx={{ flexGrow: 1 }}>
      <CardContent component={Grid} container spacing={3}>
        <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
          <Skeleton sx={{ width: 1 }} />
        </Typography>
      </CardContent>
      <Divider />

      <CardContent component={Grid} container spacing={2} sx={{}}>
        {Array.from({ length: count }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </CardContent>
      <Divider />

      <CardContent component={Grid} container spacing={3}>
        <Skeleton sx={{ width: 1 }} />
      </CardContent>
    </Card>
  </Grid>
);

export default ProductCardSkeletonGrid;
