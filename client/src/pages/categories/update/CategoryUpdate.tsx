import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography, Card, CardContent } from "@mui/material";
import CategoryUpdateForm from "../../../components/categories/update/CategoryUpdateForm";
import { useParams } from "react-router-dom";
import { useGetCategoryById } from "../../../hooks/categories.hooks";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";
import ObjectNotFound from "../../../components/common/errors/object-not-found/ObjectNotFound";
import GridLoaderCenter from "../../../components/common/grid/grid-loader-center/GridLoaderCenter";
import CircleLoadingGrid from "../../../components/common/loading/CircleLoadingGrid";

const CategoryUpdate = () => {
  const { categoryId } = useParams() as { categoryId: string };
  const {
    data: category,
    isLoading,
    refetch,
    isFetching,
    error,
  } = useGetCategoryById({ categoryId });

  if (isLoading || isFetching) return <GridLoaderCenter />;
  if (error) return <ObjectNotFound object="Category" onReload={refetch} />;
  if (!category) return <ObjectNotFound object="Category" onReload={refetch} />;

  return (
    <Grid
      sx={{
        p: 3,
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
  );
};

export default CategoryUpdate;
