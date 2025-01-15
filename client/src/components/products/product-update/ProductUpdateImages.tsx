import React, { useEffect, useState } from "react";
import ButtonInputFile from "../../common/buttons/button-input-file/ButtonInputFile";
import { uploadImage } from "../../../api/products/product.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DisplayImageUpdatePreview from "../../common/display-image-preview/DisplayImageUpdatePreview";

const ProductUpdateImages = ({
  imgUrls,
}: {
  imgUrls: string[];
  isSuccessSubmit: boolean;
}) => {
  const [existedImages, setExistedImages] = useState<string[]>(imgUrls);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>();

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

  const handleDeleteExistedImage = (fileIndex: number) => {
    setExistedImages((changedFiles) => {
      if (!changedFiles) return [];
      return changedFiles.filter((_, index) => index !== fileIndex);
    });

    setDeletedImages((changedFiles) => {
      if (!changedFiles) return [];
      return changedFiles.filter((_, index) => index === fileIndex);
    });
  };

  // useEffect(() => {
  //   if (isSuccessSubmit) {
  //     uploadImageMutation(selectedFiles);
  //   }
  // }, [isSuccessSubmit]);

  // console.log("selectedFiles: ", selectedFiles);
  return (
    <>
      <ButtonInputFile onChange={handleChange} multiple />
      <DisplayImageUpdatePreview
        onDeleteExistedImage={handleDeleteExistedImage}
        existedImages={existedImages}
        files={selectedFiles}
        onDeleteFile={handleDeleteAttachedImage}
      />
    </>
  );
};

export default ProductUpdateImages;
