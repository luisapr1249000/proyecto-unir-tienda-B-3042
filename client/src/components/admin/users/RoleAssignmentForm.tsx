import React from "react";
import { UserId } from "../../../types/user";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";

import { userRole } from "../../../validation-schemas/user-schemas/user.validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField } from "@mui/material";

const RoleAssignmentForm = ({ userId, role }: UserId & { role: string }) => {
  const initialValues = {
    role: role,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(userRole),
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
          id="role"
          name="role"
          label="Role"
          placeholder="Role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={
            formik.touched.role && formik.errors.role
              ? formik.errors.role
              : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={
            formik.touched.role && Boolean(!formik.errors.role)
              ? true
              : undefined
          }
          color={
            formik.touched.role && Boolean(!formik.errors.role)
              ? "success"
              : undefined
          }
        />
      </Grid>
    </Grid>
  );
};

export default RoleAssignmentForm;
