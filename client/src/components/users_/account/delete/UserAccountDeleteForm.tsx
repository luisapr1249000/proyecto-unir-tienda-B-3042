import React from "react";
import { Button, TextField } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Grid from "@mui/material/Grid2";
import DialogConfirmAction from "../../../common/confirm-delete-object/ConfirmDeleteObject";
import { useState } from "react";

const UserAccountDeleteForm = () => {
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => setConfirm((prev) => !prev);
  const handleClose = () => setConfirm(false);

  return (
    <>
      <DialogConfirmAction
        onDeleteObject={() => {}}
        open={confirm}
        object="User"
        onCancel={handleClose}
      />
      <Grid container spacing={3} component="form">
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Reason (optional) "
            placeholder="Any reason (optional)"
            fullWidth
            multiline
            rows={4}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </Grid>
        <Grid>
          <Button
            startIcon={<PersonRemoveIcon />}
            onClick={handleClick}
            color="error"
            variant="contained"
          >
            Delete Account
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserAccountDeleteForm;
