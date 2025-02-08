import React, { useEffect } from "react";
import { productQuantitySchema } from "../../../validation-schemas/product-schemas/product.validation";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { InputAdornment, TextField, Typography } from "@mui/material";

const ProductQuantitySelector = ({
  productQuantityValue,
  avaiblableProducts,
  onChange,
}: {
  productQuantityValue: number;
  avaiblableProducts: number;
  onChange: (quantity: number) => void;
}) => {
  const initialValues = {
    quantity: productQuantityValue,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(
      productQuantitySchema(avaiblableProducts)
    ),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("value e from: ", e.target.value);
    formik.setFieldValue("quantity", Number(e.target.value));
  };

  useEffect(() => {
    if (formik.values.quantity > 0) {
      onChange(formik.values.quantity);
    }
  }, [formik.values.quantity]);
  console.log("formik.values.quantity", formik.values.quantity);
  return (
    <TextField
      type="number"
      required
      name="quantity"
      label="Quantity"
      id="quantity"
      fullWidth
      variant="standard"
      value={formik.values.quantity}
      onChange={handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.quantity && Boolean(formik.errors.quantity)}
      helperText={formik.touched.quantity && formik.errors.quantity}
      slotProps={{
        input: {
          inputProps: { min: 1, max: avaiblableProducts },
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="caption">{avaiblableProducts}</Typography>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default ProductQuantitySelector;
