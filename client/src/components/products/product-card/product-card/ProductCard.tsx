import React from "react";
import { Product } from "../../../../types/product";
import { Card } from "@mui/material";
import ProductCardHeader from "../product-card-header/ProductCardHeader";
import ProductCardBody from "../product-card-body/ProductCardBody";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card variant="outlined">
      <ProductCardHeader />
      <ProductCardBody />
    </Card>
  );
};

export default ProductCard;
