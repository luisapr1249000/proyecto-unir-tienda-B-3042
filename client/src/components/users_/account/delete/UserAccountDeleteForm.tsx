import React from "react";
import { Button, TextField } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import DialogConfirmAction from "../../../common/dialogs/dialog-confirm-action/DialogConfirmAction";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../../api/users/user.api";
import { toast } from "react-toastify";

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
      <DialogConfirmAction
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onDeleteObject={handleDelete}
      />

      <Button
        endIcon={<PersonRemoveIcon />}
        color="error"
        variant="contained"
        onClick={handleOpenDialog}
      >
        Delete
      </Button>
    </>
  );
};

export default UserAccountDeleteForm;
