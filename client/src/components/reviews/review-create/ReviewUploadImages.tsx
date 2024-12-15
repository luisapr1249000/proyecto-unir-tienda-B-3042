import React, { useState } from "react";
import ButtonInputFile from "../../common/buttons/button-input-file/ButtonInputFile";
import DisplayImagePreview from "../../common/display-image-preview/DisplayImagePreview";
import { toast } from "react-toastify";

const ReviewUploadImages = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGES = 5;
    if (!e.currentTarget.files) return;
    const filesArray = Array.from(e.currentTarget.files);
    if (filesArray.length > MAX_IMAGES || selectedFiles.length >= MAX_IMAGES) {
      toast.error("You can only attach 5 images");
      setSelectedFiles((prev) => [...prev, ...filesArray.slice(MAX_IMAGES)]);
      return;
    }
    setSelectedFiles((prev) => [...prev, ...filesArray]);
  };

  const handleDeleteAttachedImage = (fileIndex: number) => {
    console.log(fileIndex);
    setSelectedFiles((changedFiles) => {
      if (!changedFiles) return [];
      return changedFiles.filter((_, index) => index !== fileIndex);
    });
  };

  console.log(selectedFiles);
  return (
    <>
      <ButtonInputFile onChange={handleChange} multiple />
      <DisplayImagePreview
        files={selectedFiles}
        onDeleteFile={handleDeleteAttachedImage}
      />
    </>
  );
};

export default ReviewUploadImages;
