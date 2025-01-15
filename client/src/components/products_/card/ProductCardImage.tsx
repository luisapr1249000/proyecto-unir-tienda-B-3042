import React, { useState } from "react";
import { ProductProp } from "../../../types/product";
import { CardActionArea, CardMedia } from "@mui/material";
import ReactLink from "../../common/react-link/ReactLink";

const ProductCardImage = ({ product }: ProductProp) => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => setIsLoading(false);
  return (
    <CardActionArea
      component={ReactLink}
      to={`/products/details/${product._id}`}
    >
      <CardMedia
        sx={{ height: 200, objectFit: "cover" }}
        component="img"
        src={product.images[0].url}
        onLoad={onLoad}
      />
    </CardActionArea>
  );
};

export default ProductCardImage;
