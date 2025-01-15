import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, Divider, Typography } from "@mui/material";
import { useGetCategoriesWitPagination } from "../../../hooks/categories.hooks";
import CategoryCard from "../../../components/categories/category-card/CategoryCard";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategoriesWitPagination({ page: 1, limit: 50 });

  return (
    <Grid
      container
      sx={{
        // height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
        border: 4,
        p: 4,
      }}
    >
      <Grid container spacing={3} size={{ xs: 10 }} sx={{ border: 1, p: 3 }}>
        {categories?.docs.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Categories;
