import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAuthUser } from "../../../../../hooks/auth";

const EditAddressDirection = ({ addressId }: { addressId: string }) => {
  const { data: authUser } = useAuthUser();
  const link = `/users/${authUser?.username}/address-directions/${addressId}/update`;

  return (
    <Button
      component={Link}
      to={link}
      startIcon={<EditIcon />}
      variant="outlined"
      size="small"
    >
      Edit
    </Button>
  );
};

export default EditAddressDirection;
