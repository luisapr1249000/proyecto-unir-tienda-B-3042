import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import ButtonInputFile from "../../common/buttons/button-input-file/ButtonInputFile";
import { toast } from "react-toastify";
import DisplayImagePreview from "../../common/display-image-preview/DisplayImagePreview";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ClearImagesButton = ({ onClear }: { onClear: () => void }) => {
  return (
    <Button
      startIcon={<ClearIcon />}
      onClick={onClear}
      variant="outlined"
      color="error"
    >
      Clear Images
    </Button>
  );
};

const ReviewAttachImages = ({
  setImages,
}: {
  setImages: (files: File[]) => void;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDeleteFile = (index: number) => {
    const filteredFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(filteredFiles);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGES = 8;
    const files = event.target.files;
    if (!files) return;
    const attachImages = Array.from(files);
    if (attachImages.length > MAX_IMAGES) {
      toast.error("You can only attach up to 8 images");
    }
    const limitFiles = attachImages.slice(0, MAX_IMAGES);
    setSelectedFiles((prev) => {
      const newImages = [...prev, ...limitFiles].slice(0, MAX_IMAGES);
      return newImages;
    });
  };

  const handleClearImages = () => {
    setSelectedFiles([]);
    setImages([]);
  };

  return (
    <Grid container spacing={3} size={{ xs: 12 }} sx={{}}>
      <Grid container spacing={3} size={{ xs: 12 }} sx={{}}>
        <ButtonInputFile onChange={handleChange} multiple />
        {selectedFiles.length > 0 && (
          <ClearImagesButton onClear={handleClearImages} />
        )}
      </Grid>
      <DisplayImagePreview
        onDeleteFile={handleDeleteFile}
        selectedFiles={selectedFiles}
      />
    </Grid>
  );
};

export default ReviewAttachImages;
