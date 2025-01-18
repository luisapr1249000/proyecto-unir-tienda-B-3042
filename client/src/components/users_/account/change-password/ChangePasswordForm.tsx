import { useFormik } from "formik";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { InputAdornment, TextField } from "@mui/material";
import ShowPassword from "../../../auth/show-password/ShowPassword";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import { changePasswordSchema } from "../../../../validation-schemas/auth.validation";
import { changePassword } from "../../../../api/auth.api";
import CircleLoadingGrid from "../../../common/loading/CircleLoadingGrid";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const { mutate: changePasswordMutation, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    onSubmit: (values) => {
      changePasswordMutation(values);
    },
  });

  if (isPending) return <CircleLoadingGrid />;
  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          id="currentPassword"
          name="currentPassword"
          label="Current Password"
          placeholder="Current Password"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.currentPassword &&
            Boolean(formik.errors.currentPassword)
          }
          helperText={
            formik.touched.currentPassword &&
            Boolean(formik.errors.currentPassword)
              ? formik.errors.currentPassword
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
            formik.touched.currentPassword &&
            Boolean(!formik.errors.currentPassword)
              ? true
              : undefined
          }
          color={
            formik.touched.currentPassword &&
            Boolean(!formik.errors.currentPassword)
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
          id="newPassword"
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
      <Grid size={{ xs: 12 }}>
        <SubmitButton />
      </Grid>
    </Grid>
  );
};

export default ChangePasswordForm;
