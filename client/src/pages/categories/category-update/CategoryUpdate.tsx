import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import CategoryUpdateForm from "../../../components/categories/category-update/CategoryUpdateForm";
import { useParams } from "react-router-dom";
import { useGetCategoryById } from "../../../hooks/categories.hooks";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";

const CategoryUpdate = () => {
  const { categoryId } = useParams() as { categoryId: string };

  const { data: category, isLoading } = useGetCategoryById({ categoryId });
  console.log(category);
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        border: 4,
        p: 4,
      }}
    >
      <Grid container spacing={3} size={{ xs: 10 }} sx={{ border: 1, p: 3 }}>
        <Grid>
          <Typography variant="h5">Update A Existed Category!</Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        {isLoading && <LoadSpinner />}
        {category && <CategoryUpdateForm category={category} />}
      </Grid>
    </Grid>
  );
};

export default CategoryUpdate;
