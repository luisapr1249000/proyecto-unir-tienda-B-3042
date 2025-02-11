import { Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserAccountDeleteForm from "../../../../components/users_/account/delete/UserAccountDeleteForm";

import { Card, CardContent } from "@mui/material";
import { useAuthUser } from "../../../../hooks/auth";
import UserAccountDeleteHelmet from "./UserAccountDeleteHelmet";
const UserAccountDelete = () => {
  const { data: authUser } = useAuthUser();
  return (
    <>
      <UserAccountDeleteHelmet />
      <Grid
        sx={{
          p: 3,
        }}
      >
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5">Delete Account</Typography>
          </CardContent>
          <Divider />

          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              Delete your account permanently
            </Typography>
          </CardContent>
          <CardContent>
            <UserAccountDeleteForm userId={authUser?._id ?? ""} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default UserAccountDelete;
