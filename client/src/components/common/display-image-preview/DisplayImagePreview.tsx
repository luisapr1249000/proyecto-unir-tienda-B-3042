import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import IconButtonDelete from "../buttons/iconbutton-delete/IconButtonDelete";

export const DisplayImage = ({
  preview,
  onDeleteFile,
  imageIndex,
}: {
  imageIndex: number;
  preview: string;
  onDeleteFile: (index: number) => void;
}) => (
  <Grid size={{ xs: 12, md: 4 }} sx={{ position: "relative" }}>
    <Paper
      elevation={4}
      component="img"
      src={preview}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
    <IconButtonDelete
      onDelete={() => {
        onDeleteFile(imageIndex);
        console.log(imageIndex);
      }}
    />
  </Grid>
);

const DisplayImagePreview = ({
  onDeleteFile,
  selectedFiles,
}: {
  onDeleteFile: (index: number) => void;
  selectedFiles: File[];
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }
    if (selectedFiles && selectedFiles.length > 0) {
      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(previewUrls);

      return () => {
        previewUrls.forEach((preview) => {
          URL.revokeObjectURL(preview);
        });
      };
    }
  }, [selectedFiles]);

  return (
    selectedFiles &&
    selectedFiles.length > 0 &&
    previews &&
    previews.length > 0 && (
      <Paper
        elevation={6}
        variant="outlined"
        component={Grid}
        container
        spacing={5}
        sx={{ p: 3 }}
      >
        {previews.map((preview, index) => (
          <DisplayImage
            imageIndex={index}
            preview={preview}
            onDeleteFile={onDeleteFile}
          />
        ))}
      </Paper>
    )
  );
};

export default DisplayImagePreview;
