import React from "react";
import { Product } from "../../../../types/product";
import { Card, CardActionArea, CardMedia, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCardHeader from "../product-card-header/ProductCardHeader";
import ProductCardBody from "../product-card-body/ProductCardBody";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ReactLink from "../../../common/react-link/ReactLink";
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
      <Grid
        container
        direction="column"
        sx={{ position: "absolute", right: 0, top: 0 }}
      >
        <IconButton color="inherit">
          <AddIcon />
        </IconButton>
        <IconButton color="inherit">
          <PlaylistAddIcon />
        </IconButton>
      </Grid>
      <ProductCardBody product={product} />
    </Card>
  );
};

export default ProductCard;
