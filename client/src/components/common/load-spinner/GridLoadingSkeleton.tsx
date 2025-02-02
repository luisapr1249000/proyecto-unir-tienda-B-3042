import Grid from "@mui/material/Grid2";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import SkeletonCard from "../skeleton/SkeletonCard";
const GridLoadingSkeleton = () => {
  const arrayLength = Array.from({ length: 20 });
  return (
    <Grid container spacing={3} sx={{ ...gridContainerCenter, p: 4 }}>
      {arrayLength.map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Grid>
  );
};

export default GridLoadingSkeleton;
