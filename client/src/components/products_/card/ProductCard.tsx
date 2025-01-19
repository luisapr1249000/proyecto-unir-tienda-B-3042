import { Card, CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useColorScheme } from "@mui/material/styles";
import { ProductProp } from "../../../types/product";
import ProductCardImage from "./ProductCardImage";
import ProductCardBody from "../../products/product-card/product-card-body/ProductCardBody";
import ProductCardSecondaryActions from "./ProductCardSecondaryActions";
import ProductCardActions from "./ProductCardActions";
import ProductCardContent from "./ProductCardBody";
import { Link } from "../../common/react-link/Link";
// import ProductIconButtonActions from "../../products/product-iconbutton-actions/ProductIconButtonActions";

const ProductCard = ({
  product,
  isWishlistItem = false,
}: ProductProp & { isWishlistItem?: boolean }) => {
  const { mode } = useColorScheme();
  return (
    <Card
      component={Grid}
      size={{ xs: 12, lg: 3 }}
      sx={{
        position: "relative",
      }}
      variant={mode === "dark" ? "elevation" : "outlined"}
    >
      <ProductCardImage product={product} />
      <ProductCardActions
        isWishlistItem={isWishlistItem}
        productId={product._id}
      />
      <CardActionArea component={Link} to={`/products/details/${product._id}`}>
        <ProductCardContent product={product} />
      </CardActionArea>
      <ProductCardSecondaryActions productId={product._id} />
    </Card>
  );
};

export default ProductCard;
