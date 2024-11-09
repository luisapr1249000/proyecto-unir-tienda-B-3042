import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import CancelButton from "../../common/buttons/cancel-button/CancelButton";

const ProductAddImagen = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<undefined | string[]>([]);
  useEffect(() => {
    if (!selectedFiles.length) {
      setPreviews(undefined);
      return;
    }
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    return () => {
      previews?.map((preview) => URL.revokeObjectURL(preview));
    };
  }, [selectedFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const filesArray = Array.from(e.currentTarget.files);
    setSelectedFiles(filesArray);
  };

  const handleDelete = () => {
    setPreviews(undefined);
  };
  const handleDeleteAttachedImage = (file: string) => {
    setPreviews((changedPreviews) => {
      if (!changedPreviews) return [];
      return changedPreviews.filter((preview) => preview !== file);
    });
  };
  console.log(previews);
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }} container spacing={3}>
        <Button component="label" variant="outlined">
          <input
            onChange={handleChange}
            multiple
            style={{ display: "none" }}
            type="file"
            max={5}
          />
          Attach Image(s)
        </Button>
        {previews && <CancelButton onCancel={handleDelete} />}
      </Grid>
      {selectedFiles && (
        <Grid container spacing={2}>
          {previews?.map((preview, index) => (
            <Grid key={index} component={Card} sx={{ position: "relative" }}>
              <CardMedia
                sx={{ objectFit: "cover", height: 150 }}
                component="img"
                src={preview}
              />
              <IconButton
                size="small"
                onClick={() => handleDeleteAttachedImage(preview)}
                sx={{ position: "absolute", right: 0, top: 0 }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default ProductAddImagen;
