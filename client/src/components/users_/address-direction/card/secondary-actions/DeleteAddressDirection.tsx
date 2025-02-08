import { useState } from "react";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import ConfirmDialog from "../../../../common/dialogs/confirm-dialog/ConfirmDialog";
import { useAuthUser } from "../../../../../hooks/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../../../../api/users/address.api";
import { toast } from "react-toastify";
import BackdropLoading from "../../../../common/loaders/BackdropLoading";

const DeleteAddressDirection = ({ addressId }: { addressId: string }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteAddressDirectionMutation, isPending } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`user-${authUser?._id}-address-direction`],
      });
      toast.success("Address deleted successfully");
    },
    onError: () => {
      toast.error("Please, try again");
    },
  });
  const { data: authUser } = useAuthUser();
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleConfirm = () => {
    if (!authUser) return;
    setOpenDialog(false);
    deleteAddressDirectionMutation({
      userId: authUser._id,
      addressDirectionId: addressId,
    });
  };

  if (isPending) return <BackdropLoading />;

  return (
    <>
      <Button
        startIcon={<ClearIcon />}
        variant="outlined"
        size="small"
        color="error"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <ConfirmDialog
        open={openDialog}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteAddressDirection;
