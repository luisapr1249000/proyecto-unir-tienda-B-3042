import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";

import { UserProp } from "../../../types/user";
import { formatDate } from "../../../utils/util.dates";

const UserCard = ({ user }: UserProp) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: { xs: undefined, md: 400 } }}>
      <CardContent
        container
        component={Grid}
        spacing={2}
        sx={{ alignItems: "center" }}
        direction={{ xs: "column", md: "row" }}
      >
        <Avatar src={user.avatar?.url} />
        <Typography variant="body2" color="textSecondary">
          {user.username}
        </Typography>
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
};

export default UserCard;
