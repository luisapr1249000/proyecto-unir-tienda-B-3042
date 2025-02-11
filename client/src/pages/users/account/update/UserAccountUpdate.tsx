import Grid from "@mui/material/Grid2";
import { useMatches, useOutletContext } from "react-router-dom";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import UserAccountUpdateAvatarForm from "../../../../components/users_/account/avatar/update/UserAccountUpdateAvatarForm";
import UserUpdateForm from "../../../../components/users_/account/update/UserUpdateForm";
import UserCard from "../../../../components/users_/card/UserCard";
import { User } from "../../../../types/user";
import UserAccountUpdateHelmet from "./UserAccountUpdateHelmet";

const UserAccountUpdate = () => {
  const matches = useMatches();
  console.log(matches);
  const authUser = useOutletContext<User>();

  return (
    <>
      <UserAccountUpdateHelmet />
      <Grid
        sx={{
          p: 3,
        }}
      >
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5">User Account</Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <UserCard user={authUser} />
          </CardContent>
          <Divider />

          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              User Avatar
            </Typography>
          </CardContent>
          <CardContent>
            <UserAccountUpdateAvatarForm />
          </CardContent>

          <Divider />
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Update User Info
            </Typography>
          </CardContent>
          <CardContent>
            <UserUpdateForm />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default UserAccountUpdate;
