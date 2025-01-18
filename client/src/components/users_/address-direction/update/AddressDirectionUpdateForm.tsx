import React from "react";
import Grid from "@mui/material/Grid2";
import { addressDirectionInputSchema } from "../../../../validation-schemas/user-schemas/userAddressDirection.validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import TextField from "../../../common/textfields/TextField";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import { AddressDirection } from "../../../../types/user";
import { updateAddress } from "../../../../api/users/address.api";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const AddressDirectionUpdateForm = ({
  address,
}: {
  address: AddressDirection;
}) => {
  const {
    mutate: updateAddressMutation,
    isPending: isUpdatePending,
    error: updateError,
  } = useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      console.log("Address updated successfully!");
      toast.success("Address updated successfully!");
    },
    onError: () => {
      toast.error("Please check your credentials.");
    },
  });

  const initialValues = {
    country: address.country ?? "",
    mobilePhone: address.mobilePhone ?? "",
    pinCode: address.pinCode ?? "",
    locality: address.locality ?? "",
    addressLine1: address.addressLine1 ?? "",
    addressLine2: address.addressLine2 ?? "",
    cityDistrictTown: address.cityDistrictTown ?? "",
    state: address.state ?? "",
    landmark: address.landmark ?? "",
    addressType: address.addressType ?? "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(addressDirectionInputSchema),
    onSubmit: (values) => {
      updateAddressMutation({
        userId: "342",
        addressDirectionId: address._id,
        data: values,
      });
    },
  });

  return (
    <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
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
            formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)
              ? formik.errors.mobilePhone
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="pinCode"
          label="Pin Code"
          placeholder="Pin Code"
          value={formik.values.pinCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
          helperText={
            formik.touched.pinCode && Boolean(formik.errors.pinCode)
              ? formik.errors.pinCode
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="locality"
          label="Locality"
          placeholder="Locality"
          value={formik.values.locality}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.locality && Boolean(formik.errors.locality)}
          helperText={
            formik.touched.locality && Boolean(formik.errors.locality)
              ? formik.errors.locality
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="addressLine1"
          label="Address Line 1"
          placeholder="Address Line 1"
          value={formik.values.addressLine1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)
          }
          helperText={
            formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)
              ? formik.errors.addressLine1
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="addressLine2"
          label="Address Line 2"
          placeholder="Address Line 2"
          value={formik.values.addressLine2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)
          }
          helperText={
            formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)
              ? formik.errors.addressLine2
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="cityDistrictTown"
          label="City District Town"
          placeholder="City District Town"
          value={formik.values.cityDistrictTown}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.cityDistrictTown &&
            Boolean(formik.errors.cityDistrictTown)
          }
          helperText={
            formik.touched.cityDistrictTown &&
            Boolean(formik.errors.cityDistrictTown)
              ? formik.errors.cityDistrictTown
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="state"
          label="State"
          placeholder="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={
            formik.touched.state && Boolean(formik.errors.state)
              ? formik.errors.state
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          required
          fullWidth
          name="country"
          label="Country"
          placeholder="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={
            formik.touched.country && Boolean(formik.errors.country)
              ? formik.errors.country
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default AddressDirectionUpdateForm;
