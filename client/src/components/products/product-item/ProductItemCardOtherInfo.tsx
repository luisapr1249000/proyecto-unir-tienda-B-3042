import { CardContent, Typography } from "@mui/material";
import React from "react";
import ReactLink from "../../common/react-link/ReactLink";
import { Product } from "../../../types/product";

const ProductItemCardOtherInfo = ({ product }: { product: Product }) => {
  return (
    <CardContent>
      <Typography variant="body2">
        Vendido por
        <Typography sx={{ fontWeight: "bold" }}>
          <ReactLink to={`/profile/${product.author.username}`}>
            {product.author.username}
          </ReactLink>
        </Typography>
      </Typography>
    </CardContent>
  );
};

export default ProductItemCardOtherInfo;
