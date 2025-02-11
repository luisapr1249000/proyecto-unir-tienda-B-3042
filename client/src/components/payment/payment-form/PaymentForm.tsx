import Grid from "@mui/material/Grid2";
import { InputAdornment, TextField } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useFormik } from "formik";
import { paymentSchema } from "../../../validation-schemas/payment.validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import InputMask from "react-input-mask";

const PaymentForm = () => {
  const initialValues = {
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(paymentSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid container spacing={3} size={{ xs: 12 }}>
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          required
          id="name"
          name="name"
          label="Name"
          placeholder="Name"
          value=""
          onChange={console.log}
          onBlur={console.log}
          error={false}
          helperText=""
          slotProps={{
            inputLabel: { shrink: true },
          }}
          focused={false}
          color="success"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputMask
          mask="9999 9999 9999 9999"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          maskChar=""
        >
          {() => (
            <TextField
              fullWidth
              required
              id="cardNumber"
              name="cardNumber"
              label="Card Number"
              placeholder="0123 4567 8901 2345"
              error={false}
              helperText=""
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaymentIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              focused={false}
              color="success"
            />
          )}
        </InputMask>
      </Grid>

      <Grid spacing={2} container size={{ xs: 12 }}>
        <Grid size={{ xs: "grow" }}>
          <InputMask
            mask="99/99"
            value={formik.values.expirationDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maskChar=""
          >
            {() => (
              <TextField
                fullWidth
                required
                type=""
                id="expirationDate"
                name="expirationDate"
                label="Expiration Date"
                placeholder="MM/YY"
                error={false}
                helperText=""
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                focused={false}
                color="success"
              />
            )}
          </InputMask>
        </Grid>
        <Grid size={{ xs: "grow" }}>
          <TextField
            fullWidth
            required
            id="cvv"
            name="cvv"
            label="CVV"
            placeholder="123"
            value=""
            onChange={console.log}
            onBlur={console.log}
            error={false}
            helperText=""
            slotProps={{
              inputLabel: { shrink: true },
            }}
            focused={false}
            color="success"
          />
        </Grid>
      </Grid>

      {/* <Grid size={{ xs: 12 }}>
        <SubmitButton fullWidth isValid={true} />
      </Grid> */}
    </Grid>
  );
};

export default PaymentForm;
