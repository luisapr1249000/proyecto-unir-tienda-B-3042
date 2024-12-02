import { CardActionArea, CardMedia, Skeleton } from "@mui/material";
import React, { useState } from "react";
import ReactLink from "../../../common/react-link/ReactLink";
import { ProductProp } from "../../../../types/product";

const ProductCardImage = ({ product }: ProductProp) => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => setIsLoading(false);
  return (
    <CardActionArea component={ReactLink} to={`/products/item/${product._id}`}>
      {/* {isLoading && (
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ height: 200, width: 1 }}
        />
      )} */}
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
