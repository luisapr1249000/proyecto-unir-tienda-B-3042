import React, { useState } from "react";
import { Category } from "../../../types/category";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import ReportButton from "../../common/buttons/report/ReportButton";
import DialogReportCategory from "../dialogs/DialogReportCategory";
import { formatDate } from "../../../utils/util.dates";

const CategoryCard = ({ category }: { category: Category }) => {
  const categoryState = {
    categoryId: category._id,
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
  return (
    <Card variant="outlined" sx={{ minHeight: 200, maxHeight: 200 }}>
      <CardActionArea
        component={Link}
        to={`/products/category/${category.name}`}
        state={categoryState}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {category.name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography color="textSecondary" variant="body2">
            {category.description}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Created At: {formatDate(category.createdAt)}
          </Typography>
          {category.is_modified && (
            <Typography variant="caption" color="textSecondary">
              Updated At: {formatDate(category.updatedAt)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ReportButton handleOpen={handleClickOpen} />
        <DialogReportCategory open={openDialog} handleClose={handleClose} />
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
