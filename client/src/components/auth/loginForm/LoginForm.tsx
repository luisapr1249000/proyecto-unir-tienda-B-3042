import React, { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { loginSchema } from "../../../validation-schemas/auth.validation";
import Grid from "@mui/material/Grid2";
import { InputAdornment, TextField } from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../api/auth.api";
import LoadSpinner from "../../common/load-spinner/LoadSpinner";
import { toast } from "react-toastify";
import ShowPassword from "../show-password/ShowPassword";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const { mutate, error, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
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
    onSubmit: (values) => {
      mutate(values);
      formik.setFieldValue("password", "");
    },
  });
  console.log(formik.values.password);
  return (
    <Grid
      spacing={3}
      component="form"
      onSubmit={formik.handleSubmit}
      container
      size={{ xs: 12 }}
    >
      {isPending && <LoadSpinner />}
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
          error={formik.touched.loginValue && Boolean(formik.errors.loginValue)}
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

      <Grid container size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default LoginForm;
