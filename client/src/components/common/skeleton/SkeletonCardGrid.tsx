import Grid, { Grid2Props } from "@mui/material/Grid2";
import SkeletonCard from "./SkeletonCard";
import {
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";

interface SkeletonCardGridProps extends Grid2Props {
  count?: number;
}

const SkeletonCardGrid = ({ count = 12 }: SkeletonCardGridProps) => {
  return (
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
            <SkeletonCard key={i} />
          ))}
        </CardContent>
        <Divider />

        <CardContent component={Grid} container spacing={3}>
          <Skeleton sx={{ width: 1 }} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SkeletonCardGrid;
