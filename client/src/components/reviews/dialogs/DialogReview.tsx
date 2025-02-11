import { useEffect, useState } from "react";
import { Review } from "../../../types/review";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { amber } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const DialogReview = ({
  review,
  isDialogOpen,
  onClose,
  activeImageUrl,
}: {
  review: Review;
  isDialogOpen: boolean;
  onClose: () => void;
  activeImageUrl: string;
}) => {
  const { title, content, rating, images } = review;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedImage, setSelectedImage] = useState(activeImageUrl || "");

  const isImageActive = (url: string) => selectedImage === url;

  const handleChangeActiveImage = (url: string) => {
    console.log("activeUrl: ", url);
    setSelectedImage(url);
  };

  useEffect(() => {
    if (isDialogOpen) {
      setSelectedImage(activeImageUrl);
    }

    return () => {
      if (!isDialogOpen) {
        setSelectedImage("");
      }
    };
  }, [isDialogOpen, activeImageUrl]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="xl"
      open={isDialogOpen}
      onClose={onClose}
    >
      <DialogTitle>Review</DialogTitle>

      <Tooltip title="Close">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>

      <DialogContent dividers sx={{}}>
        <Grid container spacing={3} sx={{ height: 500 }}>
          <Paper
            component={Grid}
            size={{ xs: 12, md: 6 }}
            sx={{
              height: 1,
              justifyContent: "stretch",
              alignItems: "stretch",
            }}
          >
            <CardMedia component="img" image={selectedImage} height={"100%"} />
          </Paper>

          <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1 }}>
            <Card sx={{ height: 1, overflow: "auto" }}>
              <CardContent
                component={Grid}
                container
                spacing={2}
                sx={{
                  overflow: "auto",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Avatar />
                <Typography variant="body2">
                  {review.author.username}
                </Typography>
              </CardContent>

              <Divider />

              <CardContent>
                <Rating readOnly value={rating} size="small" />
                <Typography>{title}</Typography>
              </CardContent>

              <Divider />

              <CardContent sx={{ p: 3, height: 0.4, overflow: "auto" }}>
                <Typography variant="body2">{content.repeat(100)}</Typography>
              </CardContent>

              <Divider>
                <Typography variant="body2" color="textSecondary">
                  More Images in this review
                </Typography>
              </Divider>

              <CardContent
                sx={{ overflow: "auto" }}
                component={Grid}
                container
                spacing={3}
              >
                {images.map((image) => (
                  <Paper
                    elevation={5}
                    component="img"
                    src={image.url}
                    onClick={() => handleChangeActiveImage(image.url)}
                    sx={{
                      cursor: "pointer",
                      height: 60,
                      width: 60,
                      objectFit: "cover",
                      border: isImageActive(image.url) ? 1 : 0,
                      borderColor: isImageActive(image.url)
                        ? amber["A200"]
                        : undefined,
                    }}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default DialogReview;
