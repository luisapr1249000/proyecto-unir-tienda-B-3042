import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { emailSchema } from "../../../validation-schemas/auth.validation";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { sendForgotPasswordEmail } from "../../../api/auth.api";
import { toast } from "react-toastify";

const SendForgotPasswordMailForm = () => {
  const { mutate: sendForgotPasswordMail } = useMutation({
    mutationFn: sendForgotPasswordEmail,
    onSuccess: () => {
      toast.success("Email sent successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      toast.error("Email failed to send. Please try again.");
    },
  });
  const initialValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(emailSchema),
    onSubmit: (values) => sendForgotPasswordMail(values),
  });
  return (
    <Grid
      size={{ xs: 12 }}
      container
      component="form"
      onSubmit={formik.handleSubmit}
      spacing={3}
    >
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          id="email"
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && Boolean(formik.errors.email)
              ? formik.errors.email
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.email && Boolean(!formik.errors.email)
              ? true
              : undefined
          }
          color={
            formik.touched.email && Boolean(!formik.errors.email)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default SendForgotPasswordMailForm;
