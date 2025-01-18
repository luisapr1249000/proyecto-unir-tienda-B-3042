import ReportCategoryForm from "../../reports/ReportCategoryForm";
import BasicDialogReport from "../../reports/BasicDialogReport";

const DialogReportCategory = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <BasicDialogReport
      open={open}
      handleClose={handleClose}
      itemType="Category"
    >
      <ReportCategoryForm />
    </BasicDialogReport>
  );
};

export default DialogReportCategory;
