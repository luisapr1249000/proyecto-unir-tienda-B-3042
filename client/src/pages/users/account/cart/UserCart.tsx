import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Divider,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import {
  useGetUserCart,
  useGetUserDefaultAddressDirection,
} from "../../../../hooks/user";
import CircleLoadingGrid from "../../../../components/common/loaders/CircleLoadingGrid";
import { GridObjectNotFound } from "../../../../components/common/errors/object-not-found/ObjectNotFound";
import { useAuthUser } from "../../../../hooks/auth";
import UserCartCard from "../../../../components/users_/account/cart/UserCartCard";
import UserCartSummaryCard from "../../../../components/users_/account/cart/UserCartSummaryCard";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeButton from "../../../../components/common/buttons/home/HomeButton";
import { CartItem } from "../../../../types/user";
import AddressDirectionCard from "../../../../components/users_/address-direction/card/AddressDirectionCard";
import { Link } from "../../../../components/common/react-link/Link";
import UserCartHelmet from "./UserCartHelmet";

const EmptyCart = () => {
  return (
    <Card elevation={4}>
      <CardContent
        size={{ xs: 12 }}
        component={Grid}
        container
        direction="column"
        // spacing={1}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <ShoppingCartOutlinedIcon fontSize="large" />
      </CardContent>
      <Divider />
      <CardContent
        component={Grid}
        container
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          // border: 1,
        }}
      >
        <Typography>Your have no items in your cart</Typography>
        <Typography variant="body2" color="textSecondary">
          You can browse our products and add them to your cart
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          size={{ xs: 12 }}
          container
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <HomeButton size="small" />
        </Grid>
      </CardActions>
    </Card>
  );
};

const UserCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState<CartItem[]>([]);
  const { data: authUser } = useAuthUser();
  const { data: addressDirection } = useGetUserDefaultAddressDirection({
    userId: authUser?._id ?? "",
    enabled: !!authUser,
  });

  const {
    data: userCart,
    isLoading: isLoadingUserCart,
    error: userCartError,
    refetch,
  } = useGetUserCart({ userId: authUser?._id ?? "", enabled: !!authUser });

  const handleChange = (productId: string, quantity: number) => {
    setProducts(
      products.map((product) => {
        if (product.product._id === productId) {
          let subtotal = product.product.finalPrice * quantity;
          subtotal = parseFloat(subtotal.toFixed(2));
          return {
            ...product,
            quantity: Number(quantity),
            subtotal,
          };
        }
        return product;
      })
    );
  };

  useEffect(() => {
    if (userCart && userCart.cart.items.length > 0) {
      setProducts(userCart.cart.items);
    }
  }, [userCart]);

  useEffect(() => {
    const total = products.reduce((sum, item) => sum + item.subtotal, 0);
    setTotalPrice(total);
  }, [products]);

  console.log("products", products);

  if (isLoadingUserCart) return <CircleLoadingGrid />;
  if (userCartError)
    return <GridObjectNotFound object="Cart" onReload={refetch} />;
  if (!userCart) return <GridObjectNotFound object="Cart" onReload={refetch} />;

  return (
    <>
      <UserCartHelmet />
      <Grid
        container
        spacing={3}
        size={{ xs: 10 }}
        sx={{ p: 3 }}
        direction={{ xs: "column-reverse", md: "row" }}
      >
        <Grid container size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              flexGrow: 1,
            }}
            elevation={4}
          >
            <CardContent
              component={Grid}
              container
              size={{ xs: 12 }}
              sx={{ bgcolor: "divider", flexGrow: 1 }}
            >
              <Typography variant="body2" color="textSecondary">
                User Cart
              </Typography>
            </CardContent>
            <Divider />
            <CardContent
              size={{ xs: 12 }}
              component={Grid}
              container
              spacing={3}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {userCart.cart.items.length === 0 ? (
                <EmptyCart />
              ) : (
                <>
                  {products.map((cartItem, i) => (
                    <UserCartCard
                      subtotal={cartItem.subtotal}
                      cartItem={cartItem}
                      key={i}
                      onChange={handleChange}
                    />
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid
          container
          size={{ xs: 12, md: 4 }}
          sx={{
            // border: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
          direction="column"
        >
          <UserCartSummaryCard
            totalItems={userCart.cart.totalItems}
            totalPrice={totalPrice}
          />
          {addressDirection ? (
            <Grid container size={{ xs: 12 }} sx={{}}>
              <AddressDirectionCard address={addressDirection} />
            </Grid>
          ) : (
            <Card component={Grid} size={{ xs: 12 }} sx={{}}>
              <CardContent sx={{ bgcolor: "divider" }}>
                <Typography color="textSecondary" variant="body2">
                  Select an address direction
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/users/${authUser?.username}/address-directions/create`}
                  variant="outlined"
                  size="small"
                >
                  Select Address Direction
                </Button>
              </CardActions>
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserCart;
