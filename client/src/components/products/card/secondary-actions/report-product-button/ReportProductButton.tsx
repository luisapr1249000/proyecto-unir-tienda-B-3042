import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { ProductId } from "../../../../../types/product";
import BasicReportDialog from "../../../../common/dialogs/basic-report-dialog/BasicReportDialog";
import ReportProductForm from "../../../reports/ReportProductForm";

const ReportProductButton = ({ productId }: ProductId) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Tooltip title="Report">
        <IconButton onClick={handleOpen} color="error" size="small">
          <OutlinedFlagIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <BasicReportDialog open={open} onClose={handleClose} itemType="Product">
        <ReportProductForm productId={productId} />
      </BasicReportDialog>{" "}
    </>
  );
};

export default ReportProductButton;
