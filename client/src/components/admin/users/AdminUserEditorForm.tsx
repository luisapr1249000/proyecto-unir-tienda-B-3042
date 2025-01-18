import React from "react";
import Grid from "@mui/material/Grid2";
import { userInputSchema } from "../../../validation-schemas/user-schemas/user.validation";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { User, UserProp } from "../../../types/user";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";

const AdminUserEditorForm = ({ user }: UserProp) => {
  const initialValues = {
    username: user.username,
    email: user.email,
    hasConfirmedEmail: user.hasConfirmedEmail,
    isSeller: user.isSeller ? "Yes" : "No",
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    mobilePhone: user.mobilePhone,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
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
            formik.touched.username && formik.errors.username
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
          required
          id="hasConfirmedEmail"
          name="hasConfirmedEmail"
          label="Has Confirmed Email"
          placeholder="Has Confirmed Email"
          value={formik.values.hasConfirmedEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.hasConfirmedEmail &&
            Boolean(formik.errors.hasConfirmedEmail)
          }
          helperText={
            formik.touched.hasConfirmedEmail && formik.errors.hasConfirmedEmail
              ? formik.errors.hasConfirmedEmail
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.hasConfirmedEmail &&
            Boolean(!formik.errors.hasConfirmedEmail)
              ? true
              : undefined
          }
          color={
            formik.touched.hasConfirmedEmail &&
            Boolean(!formik.errors.hasConfirmedEmail)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          name="email"
          label="Email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email && formik.errors.email
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
          id="mobilePhone"
          name="mobilePhone"
          label="Mobile Phone"
          placeholder="Mobile Phone"
          value={formik.values.mobilePhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)
          }
          helperText={
            formik.touched.mobilePhone && formik.errors.mobilePhone
              ? formik.errors.mobilePhone
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.mobilePhone && Boolean(!formik.errors.mobilePhone)
              ? true
              : undefined
          }
          color={
            formik.touched.mobilePhone && Boolean(!formik.errors.mobilePhone)
              ? "success"
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          multiline
          minRows={4}
          required
          id="bio"
          name="bio"
          label="Bio"
          placeholder="Bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={
            formik.touched.bio && formik.errors.bio
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
        <TextField
          fullWidth
          required
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={
            formik.touched.firstName && formik.errors.firstName
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
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={
            formik.touched.lastName && formik.errors.lastName
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
          name="isSeller"
          label="Is Seller"
          placeholder="Is Seller"
          value={formik.values.isSeller}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.isSeller && Boolean(formik.errors.isSeller)}
          helperText={
            formik.touched.isSeller && formik.errors.isSeller
              ? formik.errors.isSeller
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.isSeller && Boolean(!formik.errors.isSeller)
              ? true
              : undefined
          }
          color={
            formik.touched.isSeller && Boolean(!formik.errors.isSeller)
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

export default AdminUserEditorForm;
