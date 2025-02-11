import Grid from "@mui/material/Grid2";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productQuantitySchema } from "../../../../../validation-schemas/product-schemas/product.validation";
import { useDirectCheckoutStore } from "../../../../../zustand/directCheckout.store";
import { ProductProp } from "../../../../../types/product";
import { useNavigate } from "react-router-dom";

const ProductQuantitySelectorForm = ({ product }: ProductProp) => {
  const navigate = useNavigate();
  const { setCartItem } = useDirectCheckoutStore();
  const initialValues = { quantity: 1 };
  const quantitySchema = productQuantitySchema(product.quantity);
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(quantitySchema),
    onSubmit: ({ quantity }) => {
      setCartItem({
        price: product.price,
        product: product,
        quantity,
        subtotal: product.price,
        seller: product.author,
      });
      navigate("/checkout");
    },
  });
  console.log(formik.values);
  return (
    <Grid
      component="form"
      onSubmit={formik.handleSubmit}
      container
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
              input: { inputProps: { min: 1, max: product.quantity } },
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid sx={{ mt: 0.5 }} size={{ xs: 12 }}>
          <Typography sx={{}} variant="caption" color="textSecondary">
            Products Available: {product.quantity}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        direction="column"
        container
        spacing={1.5}
        size={{ xs: 12 }}
        component={Paper}
        square
        variant="outlined"
        sx={{ p: 2, my: 3, justifyContent: "center", alignItems: "center" }}
      >
        <Button type="submit" fullWidth variant="contained">
          Buy Now
        </Button>
      </Grid>
    </Grid>
  );
};
export default ProductQuantitySelectorForm;
