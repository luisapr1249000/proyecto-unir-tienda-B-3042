import { useState } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signupSchema } from "../../../validation-schemas/auth.validation";
import Grid from "@mui/material/Grid2";
import { InputAdornment, TextField } from "@mui/material";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../api/auth.api";
import { toast } from "react-toastify";
import ShowPassword from "../show-password/ShowPassword";
import ContainerCircleLoader from "../../common/loaders/ContainerCircleLoader";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const queryClient = useQueryClient();
  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(signupSchema),
    onSubmit: (values, { resetForm }) => {
      signUpMutate(values, { onError: () => resetForm() });
    },
  });
  if (isPending) return <ContainerCircleLoader />;
  return (
    <Grid
      spacing={3}
      component="form"
      onSubmit={formik.handleSubmit}
      container
      size={{ xs: 12 }}
    >
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          id="username"
          name="username"
          label="Username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={
            formik.touched.username && Boolean(formik.errors.username)
              ? formik.errors.username
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.username && Boolean(!formik.errors.username)
              ? true
              : undefined
          }
          color={
            formik.touched.username && Boolean(!formik.errors.username)
              ? "success"
              : undefined
          }
        />
      </Grid>
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

      <Grid container size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default SignupForm;
