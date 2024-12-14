import React, { useEffect, useState } from "react";
import ButtonInputFile from "../../common/buttons/button-input-file/ButtonInputFile";
import DisplayImagePreview from "../../common/display-image-preview/DisplayImagePreview";
import { uploadImage } from "../../../api/product.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductAddImagen = ({
  isSuccessSubmit,
}: {
  isSuccessSubmit: boolean;
}) => {
  const { mutate: uploadImageMutation } = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      console.log("success");
      navigate("/products");
    },
    onError: (error) => {
      console.log("error: ", error);
      toast.error(error.message);
    },
  });

  const navigate = useNavigate();
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
    setSelectedFiles((changedFiles) => {
      if (!changedFiles) return [];
      return changedFiles.filter((_, index) => index !== fileIndex);
    });
  };

  useEffect(() => {
    if (isSuccessSubmit) {
      uploadImageMutation(selectedFiles);
    }
  }, [isSuccessSubmit]);

  // console.log("selectedFiles: ", selectedFiles);
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

export default ProductAddImagen;
