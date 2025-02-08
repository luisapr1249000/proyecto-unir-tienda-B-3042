import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { CartItem } from "../../../../types/user";
import ProductQuantitySelector from "../../../products/quantity-selector/ProductQuantitySelector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthUser } from "../../../../hooks/auth";
import {
  toggleProductInCart,
  toggleProductInWishlist,
} from "../../../../api/users/userProductActions.api";
import { useNavigate } from "react-router-dom";
import { ProductId } from "../../../../types/product";
import BackdropLoading from "../../../common/loaders/BackdropLoading";

export const UserCartAddToWishlistButton = ({ productId }) => {
  const { data: authUser } = useAuthUser();
  const navigate = useNavigate();
  const { mutate: addToWishlistMutation } = useMutation({
    mutationFn: toggleProductInWishlist,
    onSuccess: () => {
      toast.success("Product added to Wishlist successfully");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Something went wrong");
    },
  });

  const handleClick = () => {
    console.log("authUser", authUser);
    if (!authUser) {
      toast.warn("Please login to add to Wishlist");
      navigate("/auth/login");
    } else {
      addToWishlistMutation({
        userId: authUser?._id ?? "",
        productId: productId,
      });
    }

    console.log("addToCartMutation");
  };
  return (
    <Button variant="outlined" size="small" onClick={handleClick}>
      Add to Wishlist
    </Button>
  );
};

export const UserCartRemoveButton = ({ productId }: ProductId) => {
  const queryClient = useQueryClient();
  const { data: authUser } = useAuthUser();
  const navigate = useNavigate();
  const {
    mutate: removeFromCartMutation,
    isPending: isRemovingItem,
    error,
  } = useMutation({
    mutationFn: toggleProductInCart,
    onSuccess: () => {
      toast.success("Product removed from Cart successfully");
      queryClient.invalidateQueries({
        queryKey: [`user-${authUser?._id}-cart`],
      });
    },
    onError: (error) => {
      console.log("error", error);
      toast.error("Something went wrong");
    },
  });

  const handleClick = () => {
    console.log("authUser", authUser);
    if (!authUser) {
      toast.warn("Please login to remove from Cart");
      navigate("/auth/login");
    } else {
      removeFromCartMutation({
        userId: authUser?._id ?? "",
        productId: productId,
        quantity: 0,
      });
    }

    console.log("removeFromCartMutation");
  };
  if (isRemovingItem) return <BackdropLoading />;
  return (
    <Button size="small" onClick={handleClick}>
      Remove
    </Button>
  );
};

const UserCartCard = ({
  cartItem,
  onChange,
  subtotal,
}: {
  cartItem: CartItem;
  onChange: (productId: string, quantity: number) => void;
  subtotal: number;
}) => {
  const handleChange = (quantity: number) => {
    onChange(cartItem.product._id, quantity);
  };
  return (
    <Card component={Grid} container size={{ xs: 12 }} elevation={5}>
      <Grid
        size={{ xs: 12, md: "grow" }}
        container
        sx={{ alignItems: "center" }}
      >
        <Grid
          container
          size={{ xs: 2 }}
          sx={{
            height: 100,
            p: 1,
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "action.hover",
          }}
        >
          <CardMedia
            component="img"
            height={"100%"}
            image={cartItem.product.images[0].url}
            alt={cartItem.product.name}
          />
        </Grid>
        <CardContent component={Grid} container size={{ xs: 4 }}>
          <Grid size={{ xs: 12 }} container spacing={2} sx={{}}>
            <Typography component="div" gutterBottom>
              {cartItem.product.name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }} container spacing={2} sx={{}}>
            <UserCartRemoveButton productId={cartItem.product._id} />
            <Button size="small">Add to cart</Button>
            <Button size="small">Buy now</Button>
          </Grid>
        </CardContent>
        <CardContent
          component={Grid}
          container
          size={{ xs: "grow" }}
          sx={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <ProductQuantitySelector
            onChange={handleChange}
            avaiblableProducts={cartItem.product.quantity}
            productQuantityValue={cartItem.quantity}
          />
        </CardContent>
        <CardContent
          component={Grid}
          container
          size={{ xs: "grow" }}
          sx={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <Grid
            container
            sx={{ justifyContent: "flex-end", alignItems: "center" }}
          >
            {cartItem.product.discount && (
              <Grid
                size={{ xs: 12 }}
                container
                spacing={1}
                sx={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="success">
                  {cartItem.product.discount}% OFF
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textDecoration: "line-through" }}
                >
                  {cartItem.product.price.toFixed(2)}$
                </Typography>
              </Grid>
            )}
            <Grid
              size={{ xs: 12 }}
              container
              spacing={1}
              sx={{
                // border: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">{subtotal.toFixed(2)}$</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </Card>
  );
};

export default UserCartCard;
