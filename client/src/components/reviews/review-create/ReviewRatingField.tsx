import Grid from "@mui/material/Grid2";
import React from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const ReviewRatingField = ({
  onChangeRating,
  value,
}: {
  onChangeRating: (newValue: number | null) => void;
  value: number;
}) => {
  return (
    <Grid size={{ xs: 12 }} container direction="column" spacing={2}>
      <Typography>Rate your product! </Typography>
      <Typography color="textSecondary" variant="body2">
        From 1 to 5
      </Typography>
      <Rating
        name="rating"
        defaultValue={1}
        precision={1}
        max={5}
        value={value}
        onChange={(_e, newValue) => onChangeRating(newValue)}
      />
    </Grid>
  );
};

export default ReviewRatingField;
