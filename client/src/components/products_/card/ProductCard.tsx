import { Card, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useColorScheme } from "@mui/material/styles";
import { ProductProp } from "../../../types/product";
import ProductCardImage from "./ProductCardImage";
import ProductCardBody from "../../products/product-card/product-card-body/ProductCardBody";
import ReactLink from "../../common/react-link/ReactLink";
import ProductCardSecondaryActions from "./ProductCardSecondaryActions";
import ProductCardActions from "./ProductCardActions";

const ProductCard = ({ product }: ProductProp) => {
  const { mode } = useColorScheme();
  return (
    <Card
      component={Grid}
      size={{ xs: 12, lg: 3 }}
      sx={{
        position: "relative",
      }}
      variant={mode === "dark" ? "elevation" : "outlined"}
      // square
      elevation={2}
    >
      <ProductCardImage product={product} />
      <ProductCardActions />
      {/* <ProductIconButtonActions product={product} /> */}
      <CardActionArea
        component={ReactLink}
        to={`/products/details/${product._id}`}
      >
        <ProductCardBody product={product} />
      </CardActionArea>
      <ProductCardSecondaryActions />
    </Card>
  );
};

export default ProductCard;
