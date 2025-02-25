import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import CategoryCreateForm from "../../../components/categories/create/CategoryCreateForm";
import CreateCategoryHelmet from "./CategoryCreateHelmet";

const CategoryCreate = () => (
  <>
    <CreateCategoryHelmet />
    <Grid
      sx={{
        p: 3,
        height: "calc(100vh - 64px)",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Create A New Category!</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <CategoryCreateForm />
        </CardContent>
      </Card>
    </Grid>
  </>
);

export default CategoryCreate;
