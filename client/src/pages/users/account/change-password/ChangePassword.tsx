import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import ChangePasswordForm from "../../../../components/users_/account/change-password/ChangePasswordForm";
import { Card, CardContent } from "@mui/material";
import ChangePasswordHelmet from "./ChangePasswordHelmet";

const ChangePassword = () => (
  <>
    <ChangePasswordHelmet />
    <Grid
      sx={{
        p: 3,
      }}
    >
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5">Change Password</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Update User Password
          </Typography>
        </CardContent>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </Grid>
  </>
);

export default ChangePassword;
