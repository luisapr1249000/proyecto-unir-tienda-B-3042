import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ReportReviewForm from "../../reports/ReportReviewForm";

const DialogReportReview = ({
  handleClose,
  open,
}: {
  open: boolean;
  handleClose: () => void;
}) => (
  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Report Review</DialogTitle>
    <Divider />
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={(theme) => ({
        position: "absolute",
        right: 8,
        top: 8,
        color: theme.palette.grey[500],
      })}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent>
      <ReportReviewForm productId={""} />
    </DialogContent>
  </Dialog>
);

export default DialogReportReview;
