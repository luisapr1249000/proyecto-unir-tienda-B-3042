import { CardContent } from "@mui/material";
import { ProductProp } from "../../../../types/product";
import ProductRatingsAndSales from "./ProductRatingAndSales";
import ProductName from "./ProductName";
import DiscountedPrice from "./DiscountedPrice";
import RegularPrice from "./RegularPrice";

const ProductCardContent = ({ product }: ProductProp) => {
  const { averageReview, name, price, finalPrice, discount, soldCount } =
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
        <RegularPrice price={price} />
      )}
    </CardContent>
  );
};

export default ProductCardContent;
