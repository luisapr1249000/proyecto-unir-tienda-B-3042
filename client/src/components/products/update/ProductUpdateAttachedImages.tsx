import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { toast } from "react-toastify";
import ButtonInputFile from "../../common/buttons/button-input-file/ButtonInputFile";
import DisplayImageUpdatePreview from "../../common/display-image-preview/DisplayImageUpdatePreview";

const ProductUpdateAttachedImages = ({
  urlImages,
}: {
  urlImages: string[];
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(urlImages);
  const [deletedExistingImages, setDeletedExistingImages] = useState<string[]>(
    []
  );

  const handleDeleteSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setDeletedExistingImages((prev) => [...prev, existingImages[index]]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGES = 8;
    const files = event.target.files;
    if (!files) return;
    const attachImages = Array.from(files);
    if (attachImages.length >= MAX_IMAGES) {
      toast.error(`You can only attach up to ${MAX_IMAGES} images`);
    }
    const limitFiles = attachImages.slice(0, MAX_IMAGES);
    setSelectedImages((prev) => {
      const newImages = [...prev, ...limitFiles].slice(0, MAX_IMAGES);
      console.log("selectedImages", newImages);
      return newImages;
    });
  };

  console.log("deletedExistingImages", deletedExistingImages);
  return (
    <Grid container spacing={3} size={{ xs: 12 }} sx={{}}>
      <ButtonInputFile onChange={handleChange} multiple />
      <DisplayImageUpdatePreview
        existedImages={existingImages}
        selectedFiles={selectedImages}
        onDeleteFile={handleDeleteSelectedImage}
        onDeleteExistedImage={handleDeleteExistingImage}
      />
    </Grid>
  );
};

export default ProductUpdateAttachedImages;
