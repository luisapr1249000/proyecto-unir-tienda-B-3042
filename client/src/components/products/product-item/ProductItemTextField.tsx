import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productQuantitySchema } from "../../../validation-schemas/product.validation";
const ProductItemTextField = ({
  productQuantity,
}: {
  productQuantity: number;
}) => {
  const initialValues = { quantity: 1 };
  const quantitySchema = productQuantitySchema(productQuantity);
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(quantitySchema),
    onSubmit: (values) => console.log(values),
  });
  console.log(formik.values);
  console.log(productQuantity);
  return (
    <Grid
      component="form"
      onSubmit={formik.handleSubmit}
      // sx={{ border: 1 }}
      container
      spacing={2}
      size={{ xs: 12 }}
    >
      <Grid size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }}>
          <TextField
            type="number"
            size="small"
            name="quantity"
            label="Quantity"
            id="quantity"
            fullWidth
            value={formik.values.quantity}
            sx={{ input: { textAlign: "center" } }}
            slotProps={{
              input: { inputProps: { min: 1, max: productQuantity } },
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid sx={{ mt: 0.5 }} size={{ xs: 12 }}>
          <Typography sx={{}} variant="caption" color="textSecondary">
            Products Available: {productQuantity}
          </Typography>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Button fullWidth variant="outlined">
          Buy Now
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductItemTextField;
