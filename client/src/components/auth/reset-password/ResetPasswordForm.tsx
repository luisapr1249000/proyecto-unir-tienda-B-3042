import { useFormik } from "formik";
import React, { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { resetPasswordSchema } from "../../../validation-schemas/auth.validation";
import Grid from "@mui/material/Grid2";
import { InputAdornment, TextField } from "@mui/material";
import ShowPassword from "../show-password/ShowPassword";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    newPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: (values) => console.log(values),
  });
  return (
    <Grid component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
              ? formik.errors.newPassword
              : undefined
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <ShowPassword
                    showPassword={showPassword}
                    handleClickShowPassword={handleClickShowPassword}
                  />
                </InputAdornment>
              ),
            },
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.newPassword && Boolean(!formik.errors.newPassword)
              ? true
              : undefined
          }
          color={
            formik.touched.newPassword && Boolean(!formik.errors.newPassword)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <SubmitButton isValid={formik.isValid} />
    </Grid>
  );
};

export default ResetPasswordForm;
