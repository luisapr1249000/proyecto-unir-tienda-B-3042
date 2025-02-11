import Grid from "@mui/material/Grid2";
import { Divider, Typography, Card, CardContent } from "@mui/material";
import UserOverviewCard from "../../../../components/users_/account/overview/UserOverview";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../../types/user";
import UserAccountOverviewHelmet from "./UserAccountOverviewHelmet";
const UserAccountOverview = () => {
  const authUserContext = useOutletContext<User>();

  return (
    <>
      <UserAccountOverviewHelmet />
      <Grid container spacing={3} size={{ xs: 10 }} sx={{ p: 3 }}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h5">User Overview</Typography>
          </CardContent>
          <Divider />

          <UserOverviewCard user={authUserContext} />
        </Card>
      </Grid>{" "}
    </>
  );
};

export default UserAccountOverview;
