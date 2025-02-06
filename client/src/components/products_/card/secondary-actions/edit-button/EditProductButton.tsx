import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import { LinkIconButton } from "../../../../common/buttons/link/ButtonLink";

export const EditProductButton = ({ productId }: { productId: string }) => (
  <Tooltip title="Edit Product">
    <LinkIconButton size="small" to={`/products/items/${productId}/update`}>
      <EditIcon color="primary" fontSize="inherit" />
    </LinkIconButton>
  </Tooltip>
);

export default EditProductButton;
