import React from "react";
import { Category } from "../../../types/category";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import CategoryCardHeader from "./CategoryCardHeader";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }: { category: Category }) => {
  const categoryState = {
    categoryId: category._id,
  };
  return (
    <Card
      component={Link}
      to={`/products/category/${category.name}`}
      state={categoryState}
      sx={{ maxWidth: 400 }}
      variant="outlined"
    >
      <CardActionArea>
        <CardContent>
          <CategoryCardHeader category={category} />
          <Typography color="textSecondary" variant="body2">
            {category.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
