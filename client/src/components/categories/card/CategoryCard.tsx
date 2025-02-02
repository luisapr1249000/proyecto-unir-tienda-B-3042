import React, { useState } from "react";
import { Category } from "../../../types/category";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ReportButton from "../../common/buttons/report/ReportButton";
import DialogReportCategory from "../dialogs/DialogReportCategory";
import { Link } from "../../common/react-link/Link";
import { useAuthUser } from "../../../hooks/auth";
import { isOwnerOrAdmin } from "../../../utils/utils";

const CategoryCard = ({ category }: { category: Category }) => {
  const categoryState = {
    categoryId: category._id,
  };

  const { data: authUser } = useAuthUser();

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
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
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ReportButton handleOpen={handleClickOpen} />
        <DialogReportCategory open={openDialog} handleClose={handleClose} />

        {authUser &&
          isOwnerOrAdmin({
            authorId: category.author._id,
            userId: authUser._id,
            role: authUser.role,
          }) && (
            <IconButton
              component={Link}
              to={`/categories/${category._id}/update`}
              size="small"
              color="inherit"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          )}
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
