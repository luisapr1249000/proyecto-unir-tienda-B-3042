import { Card, CardContent, Divider, Tooltip, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import CheckIcon from "@mui/icons-material/Check";
import { UserProp } from "../../../types/user";
import { formatDate } from "../../../utils/util.dates";
import { Link } from "../../common/react-link/Link";

const UserCard = ({ user, isSeller }: UserProp & { isSeller?: boolean }) => (
  <Card elevation={5} sx={{ maxWidth: { xs: undefined, md: 400 } }}>
    <CardContent
      container
      component={Grid}
      spacing={3}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
      direction={{ xs: "column-reverse", md: "row" }}
    >
      <Grid
        container
        sx={{ alignItems: "center", justifyContent: "space-around" }}
      >
        <Avatar src={user.avatar?.url} />
        <Typography variant="body2" color="textSecondary">
          {isSeller ? (
            <Link underline="hover" to={`/products/seller/${user.username}`}>
              {user.username}
            </Link>
          ) : (
            user.username
          )}
        </Typography>
      </Grid>
      {user.hasConfirmedEmail && (
        <Tooltip title="Verified">
          <CheckIcon color="success" />
        </Tooltip>
      )}
    </CardContent>
    <Divider />
    <CardContent>
      <Typography variant="body2" color="textSecondary">
        {user.email}
      </Typography>
    </CardContent>
    <Divider />
    <CardContent>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Joined at {formatDate(user.createdAt)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Last seen at {formatDate(user.lastLogin)}
      </Typography>
    </CardContent>
  </Card>
);

export default UserCard;
