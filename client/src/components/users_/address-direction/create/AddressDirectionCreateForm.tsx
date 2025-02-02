import Grid from "@mui/material/Grid2";
import { addressDirectionInputSchema } from "../../../../validation-schemas/user-schemas/userAddressDirection.validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import TextField from "../../../common/textfields/TextField";
import SubmitButton from "../../../common/buttons/submit-button/SubmitButton";
import SelectAddresDirectionType from "./SelectAddressDirection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress } from "../../../../api/users/address.api";
import { toast } from "react-toastify";
import { UserId } from "../../../../types/user";
import { useNavigate } from "react-router-dom";

const AddressDirectionCreateForm = ({ userId }: UserId) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createAddressDirectionMutation } = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      console.log("address created");
      toast.success("Address created successfully");
      queryClient.invalidateQueries({
        queryKey: [`user-${userId}-address-directions`],
      });
      navigate(`/users/${userId}/address-directions`);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating address");
    },
  });

  const initialValues = {
    country: "",
    mobilePhone: "",
    pinCode: "",
    locality: "",
    addressLine1: "",
    addressLine2: "",
    cityDistrictTown: "",
    state: "",
    landmark: "",
    addressType: "home",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(addressDirectionInputSchema),
    onSubmit: ({ addressType, ...values }) => {
      const addressTypeFormatted = addressType as "home" | "work";
      createAddressDirectionMutation({
        userId,
        data: { ...values, addressType: addressTypeFormatted },
      });
    },
  });

  const setAddressType = (value: "home" | "work") => {
    formik.setFieldValue("addressType", value);
  };

  console.log(formik.errors);
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
        <TextField
          required
          fullWidth
          name="landmark"
          label="Landmark"
          placeholder="Landmark"
          value={formik.values.landmark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.landmark && Boolean(formik.errors.landmark)}
          helperText={
            formik.touched.landmark && Boolean(formik.errors.landmark)
              ? formik.errors.landmark
              : undefined
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SelectAddresDirectionType
          setAddressType={setAddressType}
          addressType={formik.values.addressType as "home" | "work"}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SubmitButton isValid={formik.isValid} />
      </Grid>
    </Grid>
  );
};

export default AddressDirectionCreateForm;
