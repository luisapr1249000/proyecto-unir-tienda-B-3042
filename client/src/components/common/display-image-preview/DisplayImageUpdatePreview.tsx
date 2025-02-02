import { Card, CardContent, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { DisplayImage } from "./DisplayImagePreview";

const DisplayImageUpdatePreview = ({
  onDeleteFile,
  selectedFiles,
  existedImages,
  onDeleteExistedImage,
}: {
  onDeleteFile: (index: number) => void;
  selectedFiles: File[];
  existedImages: string[];
  onDeleteExistedImage: (index: number) => void;
}) => {
  const [previews, setPreviews] = useState<string[]>();
  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }

    if (selectedFiles && selectedFiles.length > 0) {
      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      console.log("previewUrls", previewUrls);
      setPreviews(previewUrls);

      return () => {
        previewUrls.forEach((preview) => {
          URL.revokeObjectURL(preview);
        });
      };
    }
  }, [selectedFiles]);

  return (
    <Grid container spacing={3} size={{ xs: 12 }}>
      <Card variant="outlined">
        <CardContent component={Grid} container spacing={3} size={{ xs: 12 }}>
          <Typography variant="caption">
            {existedImages && existedImages.length > 0
              ? "Existed Images"
              : "No Existed Images"}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent component={Grid} container spacing={3} size={{ xs: 12 }}>
          {existedImages && existedImages.length > 0 && (
            <>
              {existedImages.map((existedImage, index) => (
                <DisplayImage
                  preview={existedImage}
                  onDeleteFile={onDeleteExistedImage}
                  imageIndex={index}
                />
              ))}
            </>
          )}
        </CardContent>
      </Card>
      {previews && previews.length > 0 && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">Preview Images</Typography>
          </CardContent>
          <Divider />
          <CardContent component={Grid} container spacing={3} size={{ xs: 12 }}>
            {previews.map((preview, index) => (
              <DisplayImage
                preview={preview}
                onDeleteFile={onDeleteFile}
                imageIndex={index}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </Grid>
  );
};

export default DisplayImageUpdatePreview;
