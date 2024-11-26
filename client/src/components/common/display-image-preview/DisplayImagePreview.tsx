import { Box, Card, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import IconButtonDelete from "../buttons/iconbutton-delete/IconButtonDelete";

const DisplayImagePreview = ({
  onDeleteFile,
  files,
}: {
  onDeleteFile: () => void;
  files: File[];
}) => {
  const [previews, setPreviews] = useState<string[]>();
  useEffect(() => {
    if (files) {
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
      return () =>
        previewUrls.forEach((preview) => {
          URL.revokeObjectURL(preview);
        });
    }
  }, []);

  return (
    <Grid sx={{ position: "relative" }}>
      {previews?.map((preview) => (
        <Box
          component={Paper}
          elevation={2}
          key={preview}
          sx={{ height: 200, width: 200 }}
        >
          <IconButtonDelete onDelete={onDeleteFile} />
          <Box
            component="img"
            sx={{ objectFit: "cover", height: 1, width: 1 }}
            src={preview}
          />
        </Box>
      ))}
    </Grid>
  );
};

export default DisplayImagePreview;
