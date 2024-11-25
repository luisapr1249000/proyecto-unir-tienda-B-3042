import { Card } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid2";
import ProductItemImage from "./ProductItemImage";
import { Product } from "../../../types/product";
import ProductIconButtonActions from "../product-iconbutton-actions/ProductIconButtonActions";
import ProductItemTextField from "./ProductItemTextField";
import ProductItemContent from "./ProductItemContent";
import ProductItemPrice from "./ProductItemPrice";

const ProductItemCard = ({ product }: { product: Product }) => {
  return (
    <Card
      direction="row"
      component={Grid}
      container
      variant="outlined"
      sx={{
        height: 400,
        position: "relative",
        border: 1,
      }}
      size={{ xs: 10 }}
    >
      <ProductItemImage imageUrl={product.images[0].url} />
      <ProductItemContent product={product} />
      <ProductItemPrice product={product} />
    </Card>
  );
};

export default ProductItemCard;
