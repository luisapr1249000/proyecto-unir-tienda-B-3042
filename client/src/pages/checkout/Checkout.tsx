import PaymentForm from "../../components/payment/payment-form/PaymentForm";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import VisaIcon from "../../components/react-icons/VisaIcon";
import MasterCardIcon from "../../components/react-icons/MasterCardIcon";
import CheckoutSummaryCard from "../../components/checkout/checkout-summary/CheckoutSummaryCard";
import { useDirectCheckoutStore } from "../../zustand/directCheckout.store";

const Checkout = () => {
  const { cartItem } = useDirectCheckoutStore();
  return (
    <Grid container sx={{ p: 3 }}>
      <Card elevation={4} sx={{ flexGrow: 1 }}>
        <CardContent sx={{ bgcolor: "action.hover" }}>
          <Typography variant="h6">Checkout Summary</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          {cartItem && <CheckoutSummaryCard cartItem={cartItem} />}
        </CardContent>
        <CardContent
          component={Grid}
          container
          spacing={3}
          size={{ xs: 4 }}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Card elevation={4} sx={{ flexGrow: 1 }}>
            <CardContent component={Grid} container spacing={3}>
              <Typography>Payment</Typography>
              <VisaIcon />
              <MasterCardIcon />
            </CardContent>
            <CardContent>
              <PaymentForm />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Checkout;
