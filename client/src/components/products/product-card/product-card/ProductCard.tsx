import React from "react";
import { Product } from "../../../../types/product";
import { Card, CardActionArea, CardMedia, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCardHeader from "../product-card-header/ProductCardHeader";
import ProductCardBody from "../product-card-body/ProductCardBody";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ReactLink from "../../../common/react-link/ReactLink";
import ProductIconButtonActions from "../../product-iconbutton-actions/ProductIconButtonActions";
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card
      sx={{
        maxWidth: 250,
        width: 250,
        // maxHeight: 300,
        // height: 300,
        position: "relative",
      }}
      component={ReactLink}
      to={`/products/item/${product._id}`}
      variant="outlined"
    >
      <CardMedia
        sx={{ height: 200, objectFit: "cover" }}
        component="img"
        src={product.images[0].url}
      />
      <ProductIconButtonActions product={product} />

      <ProductCardBody product={product} />
    </Card>
  );
};

export default ProductCard;
