import Grid from "@mui/material/Grid2";
import { Divider, Typography, Card, CardContent } from "@mui/material";
import CategoryUpdateForm from "../../../components/categories/update/CategoryUpdateForm";
import { useParams } from "react-router-dom";
import { useGetCategoryById } from "../../../hooks/categories.hooks";
import { GridObjectNotFound } from "../../../components/common/errors/object-not-found/ObjectNotFound";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";
import CategoryUpdateHelmet from "./CategoryUpdateHelmet";

const CategoryUpdate = () => {
  const { categoryId } = useParams() as { categoryId: string };
  const {
    data: category,
    isLoading,
    refetch,
    isFetching,
    error,
  } = useGetCategoryById({ categoryId });

  if (isLoading || isFetching) return <CircleLoadingGrid />;
  if (error) return <GridObjectNotFound object="Category" onReload={refetch} />;
  if (!category)
    return <GridObjectNotFound object="Category" onReload={refetch} />;

  return (
    <>
      <CategoryUpdateHelmet />
      <Grid
        sx={{
          p: 3,
          height: "calc(100vh - 64px)",
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5">Update An Existed Category!</Typography>
          </CardContent>
          <Divider />

          <CardContent>
            <CategoryUpdateForm category={category} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default CategoryUpdate;
