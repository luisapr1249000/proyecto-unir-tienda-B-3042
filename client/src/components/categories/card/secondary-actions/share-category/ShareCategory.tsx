import { useState } from "react";
import ShareButton from "../../../../common/buttons/share-button/ShareButton";
import InfoDialog from "../../../../common/dialogs/info-dialog/InfoDialog";
import ShareTextField from "../../../../common/textfields/ShareTextField";

const ShareCategory = ({ categoryName }: { categoryName: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <ShareButton onClick={handleOpen} size="small" />
      <InfoDialog
        open={open}
        onClose={handleClose}
        dialogTitle="Compartir categoría"
      >
        <ShareTextField
          url={`http://localhost:3000/products/categories/${categoryName}`}
        />
      </InfoDialog>
    </>
  );
};

export default ShareCategory;
