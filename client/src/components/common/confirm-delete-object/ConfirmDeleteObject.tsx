import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { capitalizedText } from "../../../assets/css/mui-css-objects/gridCenter";
import CancelButton from "../buttons/cancel-button/CancelButton";
import ConfirmButton from "../buttons/confirm-button/ConfirmButton";

const ConfirmDeleteObject = ({
  open,
  object,
  onDeleteObject,
}: {
  open: boolean;
  onDeleteObject: () => void;
  object: "Product" | "Comment" | "Category" | "User";
}) => {
  const [dialogOpen, setDialogOpen] = useState(open);
  const onCancel = () => setDialogOpen(false);
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Are You Sure You Want To Delete {object} ?</DialogTitle>
      <DialogContent>
        <Typography sx={[capitalizedText]}>
          This action cant be undone
        </Typography>
      </DialogContent>
      <DialogActions>
        <ConfirmButton onConfirm={onDeleteObject} />
        <CancelButton onCancel={onCancel} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteObject;
