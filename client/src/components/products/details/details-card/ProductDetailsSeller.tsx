import React from "react";
import { Typography } from "@mui/material";
import { ProductProp } from "../../../../types/product";
import { Link } from "../../../common/react-link/Link";
import Grid from "@mui/material/Grid2";

const ProductDetailsSeller = ({ product }: ProductProp) => (
  <Grid>
    <Typography variant="caption" color="textSecondary">
      Posted by {""}
    </Typography>
    <Typography variant="caption" color="textSecondary">
      <Link underline="none" to={`/profile/${product.author.username}`}>
        {product.author.username}
      </Link>
    </Typography>
  </Grid>
);
export default ProductDetailsSeller;
