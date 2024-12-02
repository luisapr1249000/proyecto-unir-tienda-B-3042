import { Product } from "../../../../types/product";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  Divider,
  IconButton,
  MobileStepper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProductCardBody from "../product-card-body/ProductCardBody";
import ReactLink from "../../../common/react-link/ReactLink";
import ProductIconButtonActions from "../../product-iconbutton-actions/ProductIconButtonActions";
import { useState } from "react";
import { formatDate } from "../../../../utils/util.dates";
import ProductCardImage from "../product-card-image/ProductCardImage";
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card
      component={Grid}
      size={{ xs: 12, lg: 3 }}
      sx={{
        position: "relative",
      }}
      variant="outlined"
    >
      <ProductCardImage product={product} />
      <ProductIconButtonActions product={product} />
      <CardActionArea
        component={ReactLink}
        to={`/products/item/${product._id}`}
      >
        <ProductCardBody product={product} />
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
