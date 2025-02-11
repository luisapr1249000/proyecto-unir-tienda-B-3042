import { useState } from "react";
import Card from "@mui/material/Card";
import {
  CardContent,
  Typography,
  Divider,
  Button,
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAuthUser } from "../../../../hooks/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../../../../api/users/userProductActions.api";
import { toast } from "react-toastify";
import PaymentForm from "../../../payment/payment-form/PaymentForm";

const ClearCartButton = ({
  onClickClearCart,
}: {
  onClickClearCart: () => void;
}) => {
  const { data: authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const { mutate: clearCartMutation } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`user-${authUser?._id}-cart`],
      });
      toast.success("Cart cleared successfully");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Something went wrong");
    },
  });

  const handleClick = () => {
    if (!authUser) return;
    clearCartMutation({ userId: authUser._id });
    onClickClearCart();
  };
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="error"
      size="small"
    >
      Clear Cart
    </Button>
  );
};

const UserCartSummaryCard = ({
  totalItems,
  totalPrice,
}: {
  totalItems: number;
  totalPrice: number;
}) => {
  const [isCartCleared, setIsCartCleared] = useState(false);
  return (
    <Grid
      container
      size={{ xs: 12 }}
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // position: "relative",
      }}
    >
      <Card elevation={5} sx={{ flexGrow: 1 }}>
        <CardContent
          sx={{ bgcolor: "divider" }}
          component={Grid}
          size={{ xs: 12 }}
        >
          <Typography variant="body2" color="textSecondary">
            Summary
          </Typography>
        </CardContent>
        <Grid size={{ xs: 12 }}>
          <Divider />
        </Grid>
        <CardContent
          component={Grid}
          container
          spacing={1}
          sx={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          <Typography variant="body2" color="textSecondary">
            Products:
          </Typography>
          <Typography variant="body2">{totalItems}</Typography>
        </CardContent>
        <Divider />
        <CardContent
          component={Grid}
          container
          spacing={1}
          sx={{ alignItems: "center" }}
        >
          <Typography variant="body2" color="textSecondary">
            Total:{" "}
          </Typography>
          <Typography variant="body2">
            {totalItems > 0 ? totalPrice.toFixed(2) : "0 "} $
          </Typography>
        </CardContent>
        <Divider />
        {totalItems > 0 && totalPrice > 0 && (
          <>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Payment
              </Typography>
            </CardContent>
            <CardContent>
              <PaymentForm />
            </CardContent>
            <Divider />
            <CardActions sx={{ alignItems: "center" }}>
              <Button variant="outlined" size="small">
                Checkout
              </Button>
              {!isCartCleared && (
                <ClearCartButton
                  onClickClearCart={() => setIsCartCleared(true)}
                />
              )}
            </CardActions>
          </>
        )}
      </Card>
    </Grid>
  );
};

export default UserCartSummaryCard;
