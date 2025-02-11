import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderIconButton from "../../buttons/border-icon-button/BorderIconButton";

export type InfoDialogProps = {
  open: boolean;
  onClose: () => void;
  dialogTitle: string;
  children: React.ReactNode;
};

const InfoDialog = ({
  open,
  onClose,
  dialogTitle,
  children,
}: InfoDialogProps) => {
  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <BorderIconButton
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
        tooltipTitle="Close"
      >
        <CloseIcon />
      </BorderIconButton>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
