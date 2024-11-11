import { CardHeader, Typography } from "@mui/material";
import React from "react";
import { Category } from "../../../types/category";

const CategoryCardHeader = ({ category }: { category: Category }) => {
  return (
    <CardHeader title={<Typography variant="h4">{category.name}</Typography>} />
  );
};

export default CategoryCardHeader;
