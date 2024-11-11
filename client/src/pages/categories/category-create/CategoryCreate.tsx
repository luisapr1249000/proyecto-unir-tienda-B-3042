import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import CategoryCreateForm from "../../../components/categories/category-create/CategoryCreateForm";

const CategoryCreate = () => {
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
          <Typography variant="h5">Create A New Category!</Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <CategoryCreateForm />
      </Grid>
    </Grid>
  );
};

export default CategoryCreate;
