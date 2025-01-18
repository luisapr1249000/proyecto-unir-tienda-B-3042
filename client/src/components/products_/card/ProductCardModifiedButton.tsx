import React from "react";
import {
  ButtonLink,
  IconButtonLink,
} from "../../common/buttons/button-text-link/ButtonTextLink";
import EditIcon from "@mui/icons-material/Edit";
const ProductCardModifiedButton = ({ productId }: { productId: string }) => {
  return (
    <IconButtonLink to={`/products/items/${productId}/update`}>
      <EditIcon color="primary" fontSize="small" />
    </IconButtonLink>
  );
};

export default ProductCardModifiedButton;
