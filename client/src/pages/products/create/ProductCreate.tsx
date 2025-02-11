import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import ProductCreateForm from "../../../components/products/create/ProductCreateForm";
import { Card, CardContent } from "@mui/material";
import ProductCreateHelmet from "./ProductCreateHelmet";

const ProductCreate = () => (
  <>
    <ProductCreateHelmet />
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Post A New Product!</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <ProductCreateForm />
        </CardContent>
      </Card>
    </Grid>
  </>
);

export default ProductCreate;
