import React from "react";
import { ProductProp } from "../../../types/product";
import { Card, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductDetailsImage from "./ProductDetailsImage";
import ProductDetailsBody from "./body/ProductDetailsBody";
import ProductPricingDetails from "./ProductPricingDetails";

const ProductDetailsCard = ({ product }: ProductProp) => {
  return (
    <Card
      component={Grid}
      container
      variant="outlined"
      direction={{ xs: "column", md: "row" }}
      sx={{
        position: "relative",
        justifyContent: "space-evenly",
      }}
      size={{ xs: 11 }}
    >
      <ProductDetailsImage product={product} />
      <Divider orientation="vertical" flexItem />
      {/* ----- */}
      <ProductDetailsBody product={product} />
      <Divider orientation="vertical" flexItem />
      {/* ------ */}
      <ProductPricingDetails product={product} />
      {/* <ProductItemContent product={product} />

      
      <ProductItemPrice product={product} />  */}
    </Card>
  );
};
export default ProductDetailsCard;
