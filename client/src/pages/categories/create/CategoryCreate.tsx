import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import CategoryCreateForm from "../../../components/categories/create/CategoryCreateForm";

const CategoryCreate = () => {
  return (
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Create A New Category!</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <CategoryCreateForm />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryCreate;
