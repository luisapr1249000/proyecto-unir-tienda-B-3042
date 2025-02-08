import { Category } from "../../../types/category";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "../../common/react-link/Link";
import CategoryCardSecondaryActions from "./secondary-actions/CategoryCardSecondaryActions";

const CategoryCard = ({ category }: { category: Category }) => {
  const categoryState = {
    categoryId: category._id,
  };

  return (
    <Card elevation={5} sx={{}}>
      <CardActionArea
        component={Link}
        to={`/products/categories/${category.name}`}
        state={categoryState}
      >
        <CardContent>
          <Typography variant="subtitle2" component="div">
            <Link
              underline="hover"
              to={`/products/categories/${category.name}`}
            >
              {category.name}
            </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CategoryCardSecondaryActions
        categoryId={category._id}
        authorId={category.author._id}
        categoryName={category.name}
      />
    </Card>
  );
};

export default CategoryCard;
