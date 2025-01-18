import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import ProductCreateForm from "../../../components/products_/create/ProductCreateForm";
import { Card, CardContent } from "@mui/material";

const ProductCreate = () => {
  return (
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Post A New Product!</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <ProductCreateForm />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCreate;
