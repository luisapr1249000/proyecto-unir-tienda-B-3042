import React, { useState } from "react";
import { ProductProp } from "../../../types/product";
import { CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCardImage = ({ product }: ProductProp) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const onLoad = () => setIsLoading(false);
  // console.log("product card image", product.images[0].url);
  return (
    <CardActionArea component={Link} to={`/products/details/${product._id}`}>
      <CardMedia
        component="img"
        height="200"
        image={product.images[0].url ? product.images[0].url : ""}
      />
    </CardActionArea>
  );
};

export default ProductCardImage;
