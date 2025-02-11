import { Badge } from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import { BorderIconButton } from "../../../../common/buttons/iconbutton-delete/IconButtonDelete";
import { useGetUserCart } from "../../../../../hooks/user";
import { Link } from "../../../../common/react-link/Link";
import { UserId } from "../../../../../types/user";

const UserCart = ({ userId, username }: UserId & { username: string }) => {
  const { data: userCart } = useGetUserCart({
    userId: userId,
  });

  if (!userCart) return <></>;
  return (
    <Link to={`/users/${username}/cart`}>
      <BorderIconButton tooltipTitle="Cart" size="small">
        <Badge
          badgeContent={userCart.cart.totalItems}
          color="primary"
          invisible={userCart.cart.totalItems === 0}
        >
          <CartIcon />
        </Badge>
      </BorderIconButton>
    </Link>
  );
};

export default UserCart;
