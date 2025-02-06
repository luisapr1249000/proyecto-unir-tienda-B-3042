import React from "react";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createReport } from "../../../api/report.api";
import { Reason } from "../../../types/report";
import { CategoryId } from "../../../types/category";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { reportInputSchema } from "../../../validation-schemas/report.validation";

const ReportCategoryForm = ({ categoryId }: CategoryId) => {
  const { mutate: createReportMutation } = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      toast.success("Report Created successfully!");
    },
    onError: () => {
      toast.error("Please check your credentials.");
    },
  });

  const initialValues = {
    reason: "",
    problemDescription: "",
    itemType: "Product",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(reportInputSchema),
    onSubmit: ({ reason, problemDescription }) =>
      createReportMutation({
        itemType: "Product",
        reason: reason as Reason,
        reportedItemId: categoryId,
        problemDescription: problemDescription ?? "No problem description",
      }),
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("reason", event.target.value);
  };

  console.log(formik.values);
  console.log(formik.errors);

  return (
    <Grid container spacing={2} component="form" onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel></FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Spam"
          name="radio-buttons-group"
          onChange={handleChange}
          value={formik.values.reason}
        >
          <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
          <FormControlLabel
            value="Inappropriate Content"
            control={<Radio />}
            label="Inappropriate Content"
          />
          <FormControlLabel
            value="Misleading Information"
            control={<Radio />}
            label="Misleading Information"
          />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <Grid size={{ xs: 12 }}>
        <TextField
          required={formik.values.reason === "Other"}
          id="problemDescription"
          name="problemDescription"
          label={
            formik.values.reason === "Other"
              ? "Problem Description (Required)"
              : "Problem Description (Optional)"
          }
          placeholder="Problem Description"
          fullWidth
          multiline
          rows={4}
          value={formik.values.problemDescription}
          onChange={formik.handleChange}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default ReportCategoryForm;
