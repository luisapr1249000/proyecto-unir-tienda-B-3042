import { CardContent, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ProductProp } from "../../../../../types/product";
import ProductDetailsRating from "./ProductDetailsRating";
import { formatDate } from "../../../../../utils/util.dates";
import ProductDetailsSeller from "../ProductDetailsSeller";
import ProductDetailsCategories from "./ProductDetailsCategories";

const ProductDetailsBody = ({ product }: ProductProp) => (
  <CardContent
    sx={{ height: 1, borderRight: 1, borderColor: "divider", overflow: "auto" }}
    size={{ xs: 12, md: 4 }}
    component={Grid}
    container
  >
    <Grid sx={{}} size={{ xs: 12 }}>
      <Typography
        component="div"
        variant="h5"
        sx={{ fontWeight: "bold", width: 0.8 }}
      >
        {product.name}
      </Typography>
    </Grid>
    <Grid size={{ xs: 12 }}>
      <Divider>
        <Typography color="textSecondary" variant="caption">
          Product Description
        </Typography>
      </Divider>
    </Grid>

    <Grid sx={{}} size={{ xs: 12 }}>
      <Typography
        component="div"
        color="textSecondary"
        sx={{ width: 0.8, my: 1 }}
        variant="body2"
      >
        {product.description}
      </Typography>
    </Grid>

    <Grid size={{ xs: 12 }}>
      <Divider>
        <Typography color="textSecondary" variant="caption">
          Product Rating
        </Typography>
      </Divider>
    </Grid>

    <ProductDetailsRating product={product} />

    <Grid size={{ xs: 12 }}>
      <Divider>
        <Typography color="textSecondary" variant="caption">
          Product Categories
        </Typography>
      </Divider>
    </Grid>

    <ProductDetailsCategories product={product} />

    <Grid size={{ xs: 12 }}>
      <Divider>
        <Typography color="textSecondary" variant="caption">
          Product Other Info
        </Typography>
      </Divider>
    </Grid>

    <Grid size={{ xs: 12 }} sx={{}}>
      <Typography
        gutterBottom
        component="div"
        color="textSecondary"
        variant="caption"
      >
        Published At {formatDate(product.createdAt)}
      </Typography>
      {product.is_modified && (
        <>
          <Divider />
          <Typography
            gutterBottom
            component="div"
            color="textSecondary"
            variant="caption"
          >
            Updated At {formatDate(product.updatedAt)}
          </Typography>
        </>
      )}
    </Grid>

    <ProductDetailsSeller product={product} />
  </CardContent>
);

export default ProductDetailsBody;
