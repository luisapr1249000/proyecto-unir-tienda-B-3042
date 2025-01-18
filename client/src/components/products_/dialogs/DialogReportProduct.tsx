import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ReportProductForm from "../../reports/ReportProductForm";
import BasicDialogReport from "../../reports/BasicDialogReport";

const DialogReportProduct = ({
  open,
  handleClose,
  productId,
}: {
  open: boolean;
  handleClose: () => void;
  productId: string;
}) => {
  return (
    <BasicDialogReport open={open} handleClose={handleClose} itemType="Product">
      <ReportProductForm productId={productId} />
    </BasicDialogReport>
  );
};

export default DialogReportProduct;
