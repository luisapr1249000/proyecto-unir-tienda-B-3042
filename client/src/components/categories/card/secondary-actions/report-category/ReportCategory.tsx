import { useState } from "react";
import ReportButton from "../../../../common/buttons/report/ReportButton";
import BasicReportDialog from "../../../../common/dialogs/basic-report-dialog/BasicReportDialog";
import { CategoryId } from "../../../../../types/category";
import ReportCategoryForm from "../../../reports/ReportCategoryForm";

const ReportCategory = ({ categoryId }: CategoryId) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  return (
    <>
      <ReportButton handleOpen={handleClickOpen} />

      <BasicReportDialog
        itemType="Category"
        open={openDialog}
        onClose={handleClose}
      >
        <ReportCategoryForm categoryId={categoryId} />
      </BasicReportDialog>
    </>
  );
};

export default ReportCategory;
