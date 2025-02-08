import { ProductProp } from "../../../../types/product";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductDetailsImage from "./ProductDetailsImage";
import ProductDetailsBody from "./body/ProductDetailsBody";
import ProductPricingDetails from "./ProductPricingDetails";
import { GridBorderRadious } from "../../../../assets/css/mui-css-objects/grid";
// import SoldOutProduct from "../sold-out/SoldOutProduct";
import { useAuthUser } from "../../../../hooks/auth";
import { isOwnerOrAdmin } from "../../../../utils/utils";
import EditProductButton from "../../card/secondary-actions/edit-button/EditProductButton";
import ShareProductButton from "../../card/secondary-actions/share-product-button/ShareProductButton";
import ReportProductButton from "../../card/secondary-actions/report-product-button/ReportProductButton";

const ProductDetailsCard = ({ product }: ProductProp) => {
  const { data: authUser } = useAuthUser();
  return (
    <Card
      component={Grid}
      container
      elevation={4}
      direction={{ xs: "column", md: "row" }}
      sx={{
        overflow: "auto",
        position: "relative",
        ...GridBorderRadious,
      }}
      size={{ xs: 12, md: 11 }}
    >
      <CardContent
        component={Grid}
        container
        size={{ xs: 12 }}
        sx={{
          bgcolor: "action.hover",
          borderBottom: 1,
          borderColor: "divider",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        direction={{ xs: "column-reverse", md: "row" }}
        spacing={3}
      >
        <Typography color="textSecondary" variant="caption" component="h2">
          Details
        </Typography>
        <Grid container spacing={3}>
          {authUser &&
            isOwnerOrAdmin({
              role: authUser.role,
              authorId: product.author._id,
              userId: authUser._id,
            }) && <EditProductButton productId={product._id} />}
          <ShareProductButton productId={product._id} />
          <ReportProductButton productId={product._id} />
        </Grid>
      </CardContent>

      <Grid sx={{ height: 500 }} container>
        <ProductDetailsImage product={product} />
        <ProductDetailsBody product={product} />
        <ProductPricingDetails product={product} />
      </Grid>

      {/* <ProductDetailsImage product={product} />
      {product.quantity === 0 ? (
        <SoldOutProduct />
      ) : (
        <>
          <ProductDetailsBody product={product} />
          <ProductPricingDetails product={product} />
        </>
      )} */}
    </Card>
  );
};
export default ProductDetailsCard;
