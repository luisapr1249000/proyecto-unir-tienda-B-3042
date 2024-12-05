import { Card, Divider } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import ProductItemImage from "./ProductItemImage";
import { Product } from "../../../../types/product";
import ProductItemContent from "./ProductItemContent";
import ProductItemPrice from "./ProductItemPrice";

const ProductItemCard = ({ product }: { product: Product }) => {
  return (
    <Card
      component={Grid}
      container
      variant="outlined"
      direction={{ xs: "column", md: "row" }}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-evenly",
        borderRadius: 2,
      }}
      size={{ xs: 11 }}
    >
      <ProductItemImage product={product} />
      <Divider orientation="vertical" flexItem />

      <ProductItemContent product={product} />
      <Divider orientation="vertical" flexItem />

      <ProductItemPrice product={product} />
    </Card>
  );
};

export default ProductItemCard;
