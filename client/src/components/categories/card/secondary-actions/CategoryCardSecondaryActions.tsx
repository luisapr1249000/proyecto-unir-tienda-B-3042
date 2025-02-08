import { CardActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { isOwnerOrAdmin } from "../../../../utils/utils";
import { CategoryId } from "../../../../types/category";
import { LinkIconButton } from "../../../common/buttons/link/ButtonLink";
import { useAuthUser } from "../../../../hooks/auth";
import Grid from "@mui/material/Grid2";
import ShareCategory from "./share-category/ShareCategory";
import ReportCategory from "./report-category/ReportCategory";

const CategoryCardSecondaryActions = ({
  categoryId,
  authorId,
  categoryName,
}: CategoryId & { authorId: string; categoryName: string }) => {
  const { data: authUser } = useAuthUser();

  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      <Grid container spacing={1}>
        <ReportCategory categoryId={categoryId} />
        <ShareCategory categoryName={categoryName} />
      </Grid>

      {authUser &&
        isOwnerOrAdmin({
          authorId: authorId,
          userId: authUser._id,
          role: authUser.role,
        }) && (
          <LinkIconButton
            to={`/categories/${categoryId}/update`}
            size="small"
            color="inherit"
          >
            <EditIcon fontSize="inherit" />
          </LinkIconButton>
        )}
    </CardActions>
  );
};

export default CategoryCardSecondaryActions;
