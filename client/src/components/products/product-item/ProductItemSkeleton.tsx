import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";

const ProductItemSkeleton = () => (
  <Grid
    container
    sx={{
      justifyContent: "center",
      alignItems: "center",
      pb: 10,
      pt: 10,
    }}
  >
    <Card
      sx={{ justifyContent: "space-evenly", height: 500 }}
      component={Grid}
      container
      size={{ xs: 10 }}
    >
      <Grid size={{ xs: 4 }} sx={{ p: 3 }}>
        <Skeleton sx={{ height: 1, width: 1 }} variant="rectangular" />
      </Grid>
      <CardContent
        component={Grid}
        container
        direction="column"
        size={{ xs: 4 }}
        sx={{ justifyContent: "space-around" }}
      >
        <Grid sx={{ height: 0.2 }} size={{ xs: 12 }}>
          <Typography component="div" variant="h4">
            <Skeleton sx={{ width: 0.9, mb: 1 }} />
          </Typography>
          <Typography component="div" variant="body2">
            <Skeleton sx={{ width: 0.5, mb: 1 }} />
          </Typography>
        </Grid>
        <Grid sx={{ height: 0.5 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Typography key={i} component="div" variant="body2">
              <Skeleton sx={{ width: 0.9, mb: 1 }} />
            </Typography>
          ))}
        </Grid>
        <Grid
          size={{ xs: 12 }}
          container
          direction="column"
          sx={{ height: 0.2, justifyContent: "center" }}
        >
          <Typography component="div" variant="caption">
            <Skeleton sx={{ width: 0.9, mb: 1 }} />
          </Typography>
        </Grid>
      </CardContent>
      <CardContent
        component={Grid}
        container
        direction="column"
        size={{ xs: 3 }}
        sx={{ justifyContent: "space-between" }}
      >
        <Grid sx={{ height: 0.2 }}>
          <Typography component="div" variant="subtitle2">
            <Skeleton sx={{ width: 0.3 }} />
          </Typography>
          <Typography component="div" variant="h4">
            <Skeleton sx={{ width: 0.5 }} />
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          sx={{ height: 0.3, justifyContent: "center" }}
        >
          <Typography component="div" variant="h5">
            <Skeleton sx={{ width: 1 }} />
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          sx={{ height: 0.3, justifyContent: "space-around" }}
        >
          <Typography component="div" variant="h5">
            <Skeleton sx={{ width: 1 }} />
          </Typography>
          <Typography component="div" variant="h5">
            <Skeleton sx={{ width: 1 }} />
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
);

export default ProductItemSkeleton;
