import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import IconButtonDelete from "../buttons/iconbutton-delete/IconButtonDelete";
import { formatDate } from "../../../utils/util.dates";

const FileDetails = ({ file }: { file: File }) => {
  const isNameTooLong = file.name.length > 20;
  const shortName = file.name.slice(0, 20) + "...";
  const name = isNameTooLong ? shortName : file.name;
  return (
    <Grid size={{ xs: 12 }}>
      <Typography color="textSecondary" variant="body2">
        File Name:
      </Typography>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {isNameTooLong ? (
          <>
            <Tooltip title={file.name}>
              <Typography color="textSecondary" variant="body2">
                {name}
              </Typography>
            </Tooltip>
          </>
        ) : (
          file.name
        )}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        File Type:
      </Typography>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {file.type.split("/")[1]}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        File Size:
      </Typography>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </Typography>
      <Typography color="textSecondary" variant="body2">
        Last Modified:
      </Typography>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {formatDate(new Date(file.lastModified))}
      </Typography>
    </Grid>
  );
};

export const DisplayImage = ({
  preview,
  onDeleteFile,
  imageIndex,
}: {
  imageIndex: number;
  preview: string;
  onDeleteFile: (index: number) => void;
}) => (
  <Grid size={{ xs: 12 }} sx={{ position: "relative", height: 1, width: 1 }}>
    <CardMedia
      component="img"
      height={"100%"}
      image={preview}
      alt={imageIndex.toString()}
      sx={{ width: 1 }}
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
  const [previewsAndFiles, setPreviewsAndFiles] = useState<
    { preview: string; file: File }[]
  >([]);
  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }
    if (selectedFiles && selectedFiles.length > 0) {
      const previewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const previewsAndFiles = selectedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));
      setPreviewsAndFiles(previewsAndFiles);
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
      <Card elevation={4} sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography variant="body2" component="h2" color="textSecondary">
            Preview
          </Typography>
        </CardContent>
        <Divider />
        <CardContent component={Grid} container spacing={3} size={{ xs: 12 }}>
          {previewsAndFiles.map(({ preview, file }, index) => (
            <Card
              component={Grid}
              container
              elevation={5}
              sx={{ height: 200, overflow: "auto" }}
              size={{ xs: 4 }}
            >
              <CardContent sx={{ height: 200, width: 1 }}>
                <DisplayImage
                  imageIndex={index}
                  preview={preview}
                  onDeleteFile={onDeleteFile}
                />
              </CardContent>
              <Divider />
              <CardContent sx={{ width: 1 }}>
                <FileDetails file={file} />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    )
  );
};

export default DisplayImagePreview;
