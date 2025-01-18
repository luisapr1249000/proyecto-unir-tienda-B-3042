import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";

import React, { useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useGetUserById } from "../../../hooks/user";

const SearchUser = ({ setUser }) => {
  const initialValues = {
    userId: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(userId),
    onSubmit: (values) => {
      setUser(values);
      refetch();
    },
  });

  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useGetUserById({ userId: formik.values.userId, enabled: false });

  return (
    <Grid size={{ xs: 12 }}>
      <TextField
        fullWidth
        required
        id="userId"
        name="userId"
        label="User Id"
        placeholder="User Id"
        value={formik.values.userId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.userId && Boolean(formik.errors.userId)}
        helperText={
          formik.touched.userId && formik.errors.userId
            ? formik.errors.userId
            : undefined
        }
        slotProps={{
          inputLabel: { shrink: true },
        }}
        focused={
          formik.touched.userId && Boolean(!formik.errors.userId)
            ? true
            : undefined
        }
        color={
          formik.touched.userId && Boolean(!formik.errors.userId)
            ? "success"
            : undefined
        }
      />
    </Grid>
  );
};

export default SearchUser;
