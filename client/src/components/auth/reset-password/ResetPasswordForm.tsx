import { useFormik } from "formik";
import { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { forgotPasswordSchema } from "../../../validation-schemas/auth.validation";
import Grid from "@mui/material/Grid2";
import { InputAdornment, TextField } from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import CircleLoadingGrid from "../../common/loaders/CircleLoadingGrid";
import { forgotPassword } from "../../../api/auth.api";
import ShowPassword from "../show-password/ShowPassword";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const { mutate: forgotPasswordMutation, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("newPassword reset successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      toast.error("newPassword reset failed. Please try again.");
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: (values) => forgotPasswordMutation({ data: values, token }),
  });

  if (isPending) return <CircleLoadingGrid />;

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          id="newPassword"
          name="newPassword"
          label="newPassword"
          placeholder="newPassword"
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
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "newPassword"}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm newPassword"
          placeholder="Confirm newPassword"
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
