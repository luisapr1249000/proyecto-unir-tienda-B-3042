import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const DialogAlertWarning = () => {
  return (
    <Dialog open>
      <DialogContent>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
            dolorem neque modi sint illum harum, placeat quidem in ad corrupti
            dolore reiciendis dolor, ea labore vel. Reiciendis itaque commodi
            possimus?
          </Typography>
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button>e</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAlertWarning;
