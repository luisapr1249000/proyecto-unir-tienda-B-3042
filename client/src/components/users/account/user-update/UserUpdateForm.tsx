import { useFormik } from "formik";
import React from "react";
import Grid from "@mui/material/Grid2";
import { useAuthUser } from "../../../../hooks/auth";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { userInputSchema } from "../../../../validation-schemas/user-schemas/user.validation";
import { TextField } from "@mui/material";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../../api/user.api";
import { UserInput } from "../../../../types/user";

const UserUpdateForm = () => {
  const { mutate: update } = useMutation({ mutationFn: updateUser });
  const { data: authUser } = useAuthUser();
  let initialValues: UserInput = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    bio: "",
  };

  if (authUser) {
    initialValues = {
      username: authUser.username,
      email: authUser.email,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      phoneNumber: authUser.phoneNumber,
      bio: authUser.bio,
    };
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(userInputSchema),
    onSubmit: (values) => update(values),
  });

  return (
    <Grid spacing={3} container component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
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
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={
            formik.touched.firstName && Boolean(formik.errors.firstName)
              ? formik.errors.firstName
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.firstName && Boolean(!formik.errors.firstName)
              ? true
              : undefined
          }
          color={
            formik.touched.firstName && Boolean(!formik.errors.firstName)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={
            formik.touched.lastName && Boolean(formik.errors.lastName)
              ? formik.errors.lastName
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.lastName && Boolean(!formik.errors.lastName)
              ? true
              : undefined
          }
          color={
            formik.touched.lastName && Boolean(!formik.errors.lastName)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              ? formik.errors.phoneNumber
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.phoneNumber && Boolean(!formik.errors.phoneNumber)
              ? true
              : undefined
          }
          color={
            formik.touched.phoneNumber && Boolean(!formik.errors.phoneNumber)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="bio"
          label="Bio"
          placeholder="Bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={
            formik.touched.bio && Boolean(formik.errors.bio)
              ? formik.errors.bio
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.bio && Boolean(!formik.errors.bio) ? true : undefined
          }
          color={
            formik.touched.bio && Boolean(!formik.errors.bio)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} fullWidth />
      </Grid>
    </Grid>
  );
};

export default UserUpdateForm;
