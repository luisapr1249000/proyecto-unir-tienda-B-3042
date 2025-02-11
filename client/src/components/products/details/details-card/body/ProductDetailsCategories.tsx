import Grid from "@mui/material/Grid2";
import { Chip } from "@mui/material";
import { ProductProp } from "../../../../../types/product";
import { Link } from "react-router-dom";

const ProductDetailsCategories = ({ product }: ProductProp) => (
  <Grid sx={{ my: 1 }} container spacing={2} size={{ xs: 12 }}>
    {product.categories.map((category) => (
      <Chip
        clickable
        component={Link}
        to={`/products/categories/${category.name}`}
        label={category.name}
        size="small"
        key={category._id}
        // color="primary"
      />
    ))}
  </Grid>
);

export default ProductDetailsCategories;
