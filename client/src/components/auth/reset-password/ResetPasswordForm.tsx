import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "../../../validation-schemas/auth.validation";
import Grid from "@mui/material/Grid2";
import { InputAdornment, TextField } from "@mui/material";
import ShowPassword from "../show-password/ShowPassword";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: (values) => console.log(values),
  });

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password && Boolean(formik.errors.password)
              ? formik.errors.password
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
            formik.touched.password && Boolean(!formik.errors.password)
              ? true
              : undefined
          }
          color={
            formik.touched.password && Boolean(!formik.errors.password)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
              ? formik.errors.confirmPassword
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
            formik.touched.confirmPassword &&
            Boolean(!formik.errors.confirmPassword)
              ? true
              : undefined
          }
          color={
            formik.touched.confirmPassword &&
            Boolean(!formik.errors.confirmPassword)
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
