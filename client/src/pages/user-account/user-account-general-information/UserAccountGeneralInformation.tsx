import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import UserGeneralInformationCard from "../../../components/users/account/user-general-information/user-general-information/UserGeneralInformationCard";
import { User } from "../../../types/user";

const UserAccountGeneralInformation = () => {
  const context = useOutletContext<User>();
  console.log(context);
  return (
    <Grid
      size={{ xs: 12 }}
      container
      sx={{
        // height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
        border: 1,
        p: 3,
      }}
    >
      <Grid
        container
        component={Card}
        variant="outlined"
        size={{ xs: 11 }}
        sx={{ p: 3 }}
        spacing={2}
      >
        <Grid
          component={CardContent}
          container
          direction="column"
          size={{ xs: 12 }}
        >
          <Typography gutterBottom component="div" variant="h5">
            User General Information
          </Typography>
          <Divider>
            {" "}
            <Typography
              color="textSecondary"
              gutterBottom
              component="div"
              variant="body2"
            >
              User General Information
            </Typography>
          </Divider>
        </Grid>
        {context && <UserGeneralInformationCard user={context} />}
      </Grid>
    </Grid>
  );
};

export default UserAccountGeneralInformation;
