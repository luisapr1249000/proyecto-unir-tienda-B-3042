import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import React from "react";
import { User } from "../../../../types/user";
import moment from "moment";

const UserProfileCard = ({ user }: { user: User }) => {
  return (
    <Card sx={{ maxWidth: 1 }} variant="outlined">
      <CardHeader
        title={<Typography gutterBottom>{user.username}</Typography>}
        subheader={
          <Typography variant="body2" color="textSecondary">
            Last Login: {moment(user.lastLogin).format("LLL")}
          </Typography>
        }
        avatar={<Avatar alt={user.username} src={user.avatar?.url} />}
      />
    </Card>
  );
};

export default UserProfileCard;
