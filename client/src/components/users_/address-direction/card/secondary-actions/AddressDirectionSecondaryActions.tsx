import { CardActions } from "@mui/material";
import DeleteAddressDirection from "./DeleteAddressDirection";
import SetDefaultAddressDirection from "./SetDefaultAddressDirection";
import EditAddressDirection from "./EditAddressDirection";

const AddressDirectionSecondaryActions = ({
  addressId,
  isDefault,
}: {
  addressId: string;
  isDefault: boolean;
}) => (
  <CardActions>
    <EditAddressDirection addressId={addressId} />

    {!isDefault && (
      <>
        <SetDefaultAddressDirection addressId={addressId} />
        <DeleteAddressDirection addressId={addressId} />
      </>
    )}
  </CardActions>
);

export default AddressDirectionSecondaryActions;
