import {
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProductDetailSkeleton = () => (
  <Grid
    container
    sx={{
      justifyContent: "center",
      alignItems: "center",
      py: 5,
      // height: "calc(100vh - 64px)",
    }}
    spacing={3}
  >
    <Card component={Grid} container size={{ xs: 11 }} sx={{}}>
      <CardContent
        component={Grid}
        container
        size={{ xs: 12, md: 4 }}
        direction="column"
        sx={{
          borderRight: 1,
          height: 500,
          borderColor: "divider",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Skeleton variant="rectangular" sx={{ height: 0.8 }} width="100%" />
        <Skeleton variant="rectangular" sx={{ height: 0.08 }} width="100%" />
      </CardContent>
      <CardContent
        component={Grid}
        container
        size={{ xs: 12, md: 4 }}
        direction="column"
        sx={{
          borderRight: 1,
          height: 500,
          borderColor: "divider",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" sx={{ width: 1 }}>
          <Skeleton sx={{ width: 1 }} />
          <Skeleton sx={{ width: 1 }} />
        </Typography>
        <Divider flexItem>
          <Typography variant="body2" sx={{ width: 1 }}>
            <Skeleton />
          </Typography>
        </Divider>
        <Typography variant="body2" sx={{ width: 1 }}>
          <Skeleton sx={{ width: 1 }} />
          <Skeleton sx={{ width: 1 }} />
          <Skeleton sx={{ width: 1 }} />
          <Skeleton sx={{ width: 1 }} />
          <Skeleton sx={{ width: 1 }} />
          <Skeleton sx={{ width: 1 }} />
        </Typography>
        <Divider flexItem>
          <Typography variant="body2" sx={{ width: 1 }}>
            <Skeleton sx={{ width: 1 }} />
          </Typography>
        </Divider>
        <Typography variant="caption" sx={{ width: 1 }}>
          <Skeleton sx={{ width: 1 }} />
          <Skeleton sx={{ width: 1 }} />
        </Typography>
        <Divider flexItem />
        <Typography variant="caption" sx={{ width: 1 }}>
          <Skeleton sx={{ width: 1 }} />
        </Typography>
      </CardContent>
      <CardContent
        component={Grid}
        container
        size={{ xs: 12, md: 4 }}
        direction="column"
        sx={{
          height: 500,
          borderColor: "divider",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Skeleton variant="rectangular" sx={{ height: 0.8 }} width="100%" />
        <Skeleton variant="rectangular" sx={{ height: 0.1 }} width="100%" />
      </CardContent>
    </Card>
  </Grid>
);

export default ProductDetailSkeleton;
