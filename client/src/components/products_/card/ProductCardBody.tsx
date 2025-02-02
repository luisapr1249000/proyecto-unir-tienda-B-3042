import { CardContent, Rating, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { ProductProp } from "../../../types/product";

// Subcomponent for Product Ratings and Sales
const ProductRatingsAndSales = ({
  averageReview,
  soldCount,
}: {
  averageReview: number;
  soldCount: number;
}) => (
  <Grid
    container
    spacing={1}
    sx={{ alignItems: "center", justifyContent: "flex-start" }}
  >
    <Tooltip title="Average Review">
      <Rating value={averageReview} size="small" readOnly />
    </Tooltip>
    <Typography color="textSecondary" variant="caption">
      {soldCount ?? 0} Sold
    </Typography>
  </Grid>
);

// Subcomponent for Product Name
const ProductName = ({ name }: { name: string }) => (
  <Typography
    component="div"
    sx={{ textTransform: "capitalize", mt: 0.5 }}
    gutterBottom
    variant="body2"
  >
    {name}
  </Typography>
);

// Subcomponent for Discounted Price Display
const DiscountedPrice = ({
  price,
  finalPrice,
  discount,
}: {
  price: number;
  finalPrice: number;
  discount: number;
}) => (
  <>
    <Typography
      color="textSecondary"
      sx={{ textDecoration: "line-through" }}
      variant="caption"
    >
      $ {price}
    </Typography>
    <Grid container>
      <Typography
        component="div"
        sx={{ fontWeight: "bold", mr: 2 }}
        gutterBottom
        variant="h6"
      >
        $ {finalPrice}
      </Typography>
      <Typography sx={{ fontWeight: "bold" }} color="success" variant="body2">
        {discount}% OFF
      </Typography>
    </Grid>
  </>
);

// Subcomponent for Regular Price Display
const RegularPrice = ({
  price,
  productId,
}: {
  price: number;
  productId: string;
}) => (
  <Typography
    component="div"
    sx={{ fontWeight: "bold" }}
    gutterBottom
    variant="h6"
  >
    $ {price}
  </Typography>
);

const ProductCardContent = ({ product }: ProductProp) => {
  const { averageReview, name, price, finalPrice, discount, _id, soldCount } =
    product;

  return (
    <CardContent>
      <ProductRatingsAndSales
        soldCount={soldCount}
        averageReview={averageReview}
      />
      <ProductName name={name} />
      {discount ? (
        <DiscountedPrice
          price={price}
          finalPrice={finalPrice}
          discount={discount}
        />
      ) : (
        <RegularPrice price={price} productId={_id} />
      )}
    </CardContent>
  );
};

export default ProductCardContent;
