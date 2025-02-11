import { useState } from "react";
import { Review } from "../../../types/review";
import Grid from "@mui/material/Grid2";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../utils/util.dates";
import ReportButton from "../../common/buttons/report/ReportButton";
import { Image } from "../../../validation-schemas/image.validation";
import DialogReview from "../dialogs/DialogReview";
import BasicReportDialog from "../../common/dialogs/basic-report-dialog/BasicReportDialog";
import ReportReviewForm from "../reports/ReportReviewForm";

const ReviewImages = ({
  review,
  images,
}: {
  review: Review;
  images: Image[];
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState("");
  const handleOpenDialog = (activeUrl: string) => {
    setOpenDialog(true);
    setActiveImageUrl(activeUrl);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 3,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <DialogReview
        review={review}
        isDialogOpen={openDialog}
        onClose={handleCloseDialog}
        activeImageUrl={activeImageUrl}
      />
      {images.map((image) => (
        <Paper
          elevation={5}
          component={Grid}
          container
          size={{ xs: 12, md: 1 }}
          key={image.originalName}
          sx={{
            height: 100,
          }}
        >
          <CardMedia
            component="img"
            onClick={() => handleOpenDialog(image.url)}
            image={image.url}
            sx={{
              borderRadius: 1,
              cursor: "pointer",
            }}
            height={"100%"}
          />
        </Paper>
      ))}
    </Grid>
  );
};

const ReviewReportSection = ({ reviewId }: { reviewId: string }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <ReportButton handleOpen={handleOpen} />
      <BasicReportDialog open={open} onClose={handleClose} itemType="Review">
        <ReportReviewForm reviewId={reviewId} />
      </BasicReportDialog>
    </>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card elevation={5} sx={{ flexGrow: 1 }}>
      <CardContent
        sx={{ justifyContent: "flex-start", alignItems: "center" }}
        component={Grid}
        container
        spacing={2}
        direction={{ xs: "column", md: "row" }}
      >
        <Avatar
          sx={{ width: 35, height: 35 }}
          src={review.author.avatar?.url}
        />
        <Typography variant="body2" color="textSecondary">
          {review.author.username}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid size={{ xs: 12 }}>
          <Rating value={review.rating} size="small" readOnly />
          <Typography variant="body2">{review.title}</Typography>{" "}
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2">{review.content}</Typography>
      </CardContent>
      <Divider />
      {review.images.length > 0 && (
        <ReviewImages review={review} images={review.images} />
      )}

      <Divider />
      <CardActions
        sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="caption" color="textSecondary">
            Created At: {formatDate(review.createdAt)}
          </Typography>
          {review.is_modified && (
            <>
              <Divider />

              <Typography variant="caption" color="textSecondary">
                updated At: {formatDate(review.updatedAt)}
              </Typography>
            </>
          )}
        </Box>
        <ReviewReportSection reviewId={review._id} />
      </CardActions>
    </Card>
  );
};

export default ReviewCard;
