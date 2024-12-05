import { Avatar, Card, CardHeader, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { User } from "../../../../types/user";
import moment from "moment";
import { formatDate } from "../../../../utils/util.dates";

const UserProfileCard = ({ user }: { user: User }) => {
  return (
    <Card sx={{ maxWidth: 1 }} variant="outlined">
      <CardHeader
        title={<Typography gutterBottom>{user.username}</Typography>}
        subheader={
          <Grid container direction="column" spacing={1}>
            <Typography gutterBottom variant="caption" color="textSecondary">
              Last Login: {formatDate(user.lastLogin)}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="caption" color="textSecondary">
              Joined At : {formatDate(user.createdAt)}
            </Typography>
            <Divider />

            <Typography gutterBottom variant="caption" color="textSecondary">
              Updated At: {formatDate(user.updatedAt)}
            </Typography>
          </Grid>
        }
        avatar={<Avatar alt={user.username} src={user.avatar?.url} />}
      />
    </Card>
  );
};

export default UserProfileCard;
