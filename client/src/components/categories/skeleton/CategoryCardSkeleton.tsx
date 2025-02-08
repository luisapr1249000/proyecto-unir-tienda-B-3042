import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
const CategoryCardSkeleton = () => {
  return (
    <Card component={Grid} size={{ xs: 12, lg: 6 }}>
      <Skeleton sx={{ height: 50 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Typography variant="body2" component="div">
          <Skeleton sx={{ width: 1 }} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCardSkeleton;
