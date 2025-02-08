import { Button } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../../api/users/user.api";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../common/dialogs/confirm-dialog/ConfirmDialog";

const UserAccountDeleteForm = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      navigate("/users");
      toast.success("User deleted successfully");
    },
    onError: () => {
      console.log("error");
      toast.error("Error deleting user");
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleDelete = () => {
    console.log("delete");
    setIsDialogOpen(false);
    deleteUserMutation(userId);
  };

  return (
    <>
      <ConfirmDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        message="Are you sure? This action cant be undone"
      />
      <Button
        variant="contained"
        color="error"
        onClick={handleOpenDialog}
        endIcon={<PersonRemoveIcon />}
      >
        Delete
      </Button>
    </>
  );
};

export default UserAccountDeleteForm;
