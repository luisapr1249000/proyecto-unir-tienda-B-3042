import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import SubmitButton from "../../common/buttons/submit-button/SubmitButton";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { productQuantitySchema } from "../../../validation-schemas/product-schemas/product.validation";
import { toast } from "react-toastify";
import { toggleProductInCart } from "../../../api/users/userProductActions.api";
import { useAuthUser } from "../../../hooks/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BackdropLoading from "../../common/loaders/BackdropLoading";
import ClearButton from "../../common/buttons/clear-button/ClearButton";

export const CartForm = ({
  availabilityQuantity,
  productId,
  onClose,
  userId,
}: {
  availabilityQuantity: number;
  productId: string;
  onClose: () => void;
  userId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate: addToCartMutation, isPending } = useMutation({
    mutationFn: toggleProductInCart,
    onSuccess: () => {
      toast.success("Product added to Cart successfully");
      onClose();
      queryClient.invalidateQueries({
        queryKey: [`user-${userId}-cart`],
      });
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Something went wrong");
    },
  });
  const initialValues = {
    quantity: 1,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(
      productQuantitySchema(availabilityQuantity)
    ),
    onSubmit: ({ quantity }) => {
      addToCartMutation({
        quantity,
        userId: userId,
        productId,
      });
    },
  });
  if (isPending) return <BackdropLoading />;
  return (
    <Grid
      size={{ xs: "grow" }}
      container
      component="form"
      spacing={2}
      onSubmit={formik.handleSubmit}
    >
      <Grid size={{ xs: 12 }}>
        <TextField
          type="number"
          label="Quantity"
          autoFocus
          margin="dense"
          id="quantity"
          fullWidth
          slotProps={{
            htmlInput: { min: 1, max: availabilityQuantity },
          }}
          variant="standard"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
        />
      </Grid>
      <Grid size={{ xs: 12 }} container spacing={1}>
        <SubmitButton isValid={formik.isValid} />
        <ClearButton onCancel={onClose} />
      </Grid>
    </Grid>
  );
};

export const CartDialog = ({
  open,
  onClose,
  productId,
  productName,
  availabilityQuantity,
}: {
  open: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  availabilityQuantity: number;
}) => {
  const { data: authUser, isLoading } = useAuthUser();
  if (isLoading) return <BackdropLoading />;
  if (!authUser) return <></>;
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Add to Cart</DialogTitle>
      <Tooltip title="Close">
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <DialogContent dividers>
        <DialogContentText>
          <Typography gutterBottom>
            Product "{productName}"" is available for purchase
          </Typography>
          <Typography variant="body2">
            {availabilityQuantity} items available
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <CartForm
          onClose={onClose}
          productId={productId}
          availabilityQuantity={availabilityQuantity}
          userId={authUser._id}
        />
      </DialogContent>
    </Dialog>
  );
};

// export default CartDialogForm;
