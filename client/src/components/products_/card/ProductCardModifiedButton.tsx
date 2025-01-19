import { IconButtonLink } from "../../common/buttons/link/ButtonLink";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
const ProductCardModifiedButton = ({ productId }: { productId: string }) => (
  <Tooltip title="Edit Product">
    <IconButtonLink to={`/products/items/${productId}/update`}>
      <EditIcon color="primary" fontSize="small" />
    </IconButtonLink>
  </Tooltip>
);

export default ProductCardModifiedButton;
