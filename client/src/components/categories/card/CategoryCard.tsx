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
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import ReportButton from "../../common/buttons/report/ReportButton";
import DialogReportCategory from "../dialogs/DialogReportCategory";
import { formatDate } from "../../../utils/util.dates";
import { Link } from "../../common/react-link/Link";

const CategoryCard = ({ category }: { category: Category }) => {
  const categoryState = {
    categoryId: category._id,
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
  return (
    <Card variant="outlined" sx={{}}>
      <CardActionArea
        component={Link}
        to={`/products/category/${category.name}`}
        state={categoryState}
      >
        <CardContent sx={{ minHeight: 100, maxHeight: 100 }}>
          <Typography variant="h6" component="div">
            {category.name}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent sx={{ minHeight: 250 }}>
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
      <Divider />
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ReportButton handleOpen={handleClickOpen} />
        <DialogReportCategory open={openDialog} handleClose={handleClose} />
        <IconButton
          component={Link}
          to={`/categories/${category._id}/update`}
          size="small"
          color="inherit"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
