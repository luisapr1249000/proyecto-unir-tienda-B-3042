import React, { useState } from "react";
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
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../utils/util.dates";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import ReportButton from "../../common/buttons/report/ReportButton";
import DialogReportReview from "../dialogs/DialogReportReview";
import { Image } from "../../../validation-schemas/image.validation";

const ReviewImages = ({ images }: { images: Image[] }) => {
  return (
    <Grid
      container
      spacing={2}
      size={{ xs: 12 }}
      sx={{
        // border: 1,
        p: 3,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {images.map((image) => (
        <Grid
          size={{ xs: 12, md: 3 }}
          key={image.originalName}
          sx={{ height: 200 }}
        >
          <Paper
            elevation={5}
            component="img"
            src={image.url}
            alt={image.originalName}
            sx={{
              objectFit: "containe",
              objectPosition: "center center",
              height: 1,
              width: 1,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const ReviewReportSection = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <ReportButton handleOpen={handleOpen} />
      <DialogReportReview handleClose={handleClose} open={open} />
    </>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <Card variant="outlined">
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
        <Grid size={{ xs: 12 }}>
          <Rating value={review.review} size="small" readOnly />
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2">{review.content}</Typography>
      </CardContent>
      <Divider />
      {review.images.length > 0 && <ReviewImages images={review.images} />}

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
        <ReviewReportSection />
      </CardActions>
    </Card>
  );
};

export default ReviewCard;
