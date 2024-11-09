import React from "react";
import Grid from "@mui/material/Grid2";
import ProductCreateForm from "../../../components/products/product-create/ProductCreateForm";
import { Divider, Typography } from "@mui/material";

const ProductCreatePage = () => {
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
        <Grid>
          <Typography variant="h5">Post A New Product!</Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <ProductCreateForm />
      </Grid>
    </Grid>
  );
};

export default ProductCreatePage;
