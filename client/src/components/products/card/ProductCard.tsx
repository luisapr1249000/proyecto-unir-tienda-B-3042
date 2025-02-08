import { Card, CardActionArea, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProductProp } from "../../../types/product";
import ProductCardImage from "./ProductCardImage";
import ProductCardSecondaryActions from "./secondary-actions/ProductCardSecondaryActions";
import { Link } from "../../common/react-link/Link";
import Wishlist from "./secondary-actions/wishlist/Wishlist";
import ProductCardContent from "./body/ProductCardContent";

const ProductCard = ({
  product,
  isWishlistItem = false,
}: ProductProp & { isWishlistItem?: boolean }) => {
  return (
    <Card
      component={Grid}
      size={{ xs: 12, lg: 3 }}
      sx={{
        position: "relative",
      }}
      elevation={5}
    >
      <ProductCardImage product={product} />
      <Divider />
      <Wishlist
        productId={product._id}
        isWishlistItem={isWishlistItem}
        wishlistCount={product.wishlistCount}
      />

      <CardActionArea component={Link} to={`/products/details/${product._id}`}>
        <ProductCardContent product={product} />
      </CardActionArea>
      <Divider />
      <ProductCardSecondaryActions product={product} />
    </Card>
  );
};

export default ProductCard;
