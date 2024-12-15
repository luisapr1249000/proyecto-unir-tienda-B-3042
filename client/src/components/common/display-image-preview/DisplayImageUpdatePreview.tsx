import { Box, Card, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import IconButtonDelete from "../buttons/iconbutton-delete/IconButtonDelete";

const DisplayImageUpdatePreview = ({
  onDeleteFile,
  files,
  existedImages,
  onDeleteExistedImage,
}: {
  onDeleteFile: (index: number) => void;
  files: File[];
  existedImages: string[];
  onDeleteExistedImage: (index: number) => void;
}) => {
  const [previews, setPreviews] = useState<string[]>();
  useEffect(() => {
    if (files && files.length > 0) {
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);

      return () => {
        previewUrls.forEach((preview) => {
          URL.revokeObjectURL(preview);
        });
      };
    }
  }, []);

  // console.log("previews", previews);
  return (
    <>
      {existedImages && existedImages.length > 0 && (
        <Paper
          component={Grid}
          elevation={4}
          container
          spacing={3}
          size={{ xs: 12 }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {existedImages?.map((existedImage, index) => (
            <Paper
              component={Grid}
              size={{ xs: "grow" }}
              elevation={2}
              key={existedImage}
              sx={{
                height: { xs: 200, md: 150 },
                width: { xs: 1, md: 150 },
                objectFit: "contained",
                position: "relative",
              }}
            >
              <IconButtonDelete onDelete={() => onDeleteExistedImage(index)} />
              <Box
                component="img"
                sx={{ objectFit: "cover", height: 1, width: 1 }}
                src={existedImage}
              />
            </Paper>
          ))}
        </Paper>
      )}
      {previews && previews.length > 0 && (
        <Paper
          component={Grid}
          elevation={4}
          container
          spacing={3}
          size={{ xs: 12 }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {previews?.map((preview, index) => (
            <Paper
              component={Grid}
              size={{ xs: "grow" }}
              elevation={2}
              key={preview}
              sx={{
                height: { xs: 200, md: 150 },
                width: { xs: 1, md: 150 },
                objectFit: "contained",
                position: "relative",
              }}
            >
              <IconButtonDelete onDelete={() => onDeleteFile(index)} />
              <Box
                component="img"
                sx={{ objectFit: "cover", height: 1, width: 1 }}
                src={preview}
              />
            </Paper>
          ))}
        </Paper>
      )}
    </>
  );
};

export default DisplayImageUpdatePreview;
