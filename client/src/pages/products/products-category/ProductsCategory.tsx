import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { useGetCategoryByName } from "../../../hooks/category";
import GridLoadingSkeleton from "../../../components/common/load-spinner/GridLoadingSkeleton";
import ProductsByCategory from "../../../components/products/products-by-category/ProductsByCategory";

const ProductsCategory = () => {
  const { categoryName } = useParams() as { categoryName: string };
  const {
    data: category,
    isLoading,
    error,
    isSuccess,
  } = useGetCategoryByName({
    categoryName,
  });

  if (isLoading) return <GridLoadingSkeleton />;
  if (!category || !isSuccess || error)
    return <Typography>Products Not Found</Typography>;

  return <ProductsByCategory category={category} />;
};

export default ProductsCategory;
