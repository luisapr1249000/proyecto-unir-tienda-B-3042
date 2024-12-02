import React from "react";
import Grid from "@mui/material/Grid2";
import { Chip } from "@mui/material";
import { CategoryData } from "./ProductAddCategory";

const ProductDisplayCategories = ({
  onDeleteCategory,
  categories,
}: {
  onDeleteCategory: () => void;
  categories: CategoryData;
}) => {
  return (
    <Grid container spacing={3}>
      {categories.map((category, key) => (
        <Chip
          key={key}
          onDelete={onDeleteCategory}
          label={category.categoryName}
        />
      ))}
    </Grid>
  );
};

export default ProductDisplayCategories;
