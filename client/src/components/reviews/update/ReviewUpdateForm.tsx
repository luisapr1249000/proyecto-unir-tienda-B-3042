import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField } from "@mui/material";
import { Review } from "../../../types/review";
import { reviewInputSchema } from "../../../validation-schemas/review.validation";
import ReviewRatingField from "../create/ReviewRatingField";
import { useMutation } from "@tanstack/react-query";
import { updateReview } from "../../../api/review.api";
import { toast } from "react-toastify";
import CircleLoadingGrid from "../../common/loaders/CircleLoadingGrid";

const ReviewUpdateForm = ({
  review,
  productId,
}: {
  review: Review;
  productId: string;
}) => {
  const { mutate: updateReviewMutation, isPending } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      console.log("success");
      toast.success("Review updated successfully");
    },
    onError: () => {
      console.log("error");
      toast.error("Something went wrong");
    },
  });

  const initialValues = {
    title: review.title ?? "",
    content: review.content ?? "",
    rating: review.rating ?? 1,
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(reviewInputSchema),
    onSubmit: (values) => {
      updateReviewMutation({
        values,
        productId,
        reviewId: review._id,
      });
    },
  });

  const onChangeRating = (newValue: number | null) => {
    formik.setFieldValue("rating", newValue);
  };
  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <ReviewRatingField
        onChangeRating={onChangeRating}
        value={formik.values.rating}
      />
      {isPending && <CircleLoadingGrid />}
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          id="content"
          name="content"
          label="Review Content"
          placeholder="Review Content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={
            formik.touched.content && Boolean(formik.errors.content)
              ? formik.errors.content
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.content && Boolean(!formik.errors.content)
              ? true
              : undefined
          }
          color={
            formik.touched.content && Boolean(!formik.errors.content)
              ? "success"
              : undefined
          }
        />
      </Grid>
    </Grid>
  );
};

export default ReviewUpdateForm;
