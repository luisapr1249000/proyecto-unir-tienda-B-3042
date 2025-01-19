import { ProductProp } from "../../../types/product";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductDetailsImage from "./ProductDetailsImage";
import ProductDetailsBody from "./body/ProductDetailsBody";
import ProductPricingDetails from "./ProductPricingDetails";

const ProductDetailsCard = ({ product }: ProductProp) => {
  return (
    <Card
      component={Grid}
      container
      elevation={4}
      direction={{ xs: "column", md: "row" }}
      sx={{
        position: "relative",
        justifyContent: "space-evenly",
      }}
      size={{ xs: 11 }}
    >
      <ProductDetailsImage product={product} />
      {/* ----- */}
      <ProductDetailsBody product={product} />
      {/* ------ */}
      <ProductPricingDetails product={product} />
    </Card>
  );
};
export default ProductDetailsCard;
