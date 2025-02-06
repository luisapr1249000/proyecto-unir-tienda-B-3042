import React, { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "../../../validation-schemas/auth.validation";
import Grid from "@mui/material/Grid2";
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../api/auth.api";
import { toast } from "react-toastify";
import ShowPassword from "../show-password/ShowPassword";
import ContainerLoader from "../../common/loaders/ContainerLoader";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.message);
      toast.error("Login failed. Please check your credentials.");
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues = {
    rememberMe: false,
    loginValue: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: (values, { setFieldValue }) => {
      loginMutate(values, { onError: () => setFieldValue("password", "") });
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("rememberMe", event.target.checked);
  };

  if (isPending) return <ContainerLoader />;

  return (
    <Grid
      spacing={1}
      component="form"
      onSubmit={formik.handleSubmit}
      container
      size={{ xs: 12 }}
    >
      <Grid container spacing={3} size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            required
            id="loginValue"
            name="loginValue"
            label="Username / Email"
            placeholder="Username Or Email"
            value={formik.values.loginValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.loginValue && Boolean(formik.errors.loginValue)
            }
            helperText={
              formik.touched.loginValue && Boolean(formik.errors.loginValue)
                ? formik.errors.loginValue
                : undefined
            }
            slotProps={{
              inputLabel: { shrink: true },
            }}
            focused={
              formik.touched.loginValue && Boolean(!formik.errors.loginValue)
                ? true
                : undefined
            }
            color={
              formik.touched.loginValue && Boolean(!formik.errors.loginValue)
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
            id="password"
            autoComplete="off"
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
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControlLabel
          checked={formik.values.rememberMe}
          control={<Checkbox onChange={handleChange} size="small" />}
          label={<Typography variant="body2">Remember me</Typography>}
        />
      </Grid>

      <Grid sx={{ mt: 2 }} container size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default LoginForm;
