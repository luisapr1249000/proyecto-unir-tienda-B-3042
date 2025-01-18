import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography, Card, CardContent } from "@mui/material";
import SignupForm from "../../../components/auth/signupForm/SignupForm";
import GoogleAuthButton from "../../../components/auth/google-auth-button/GoogleAuthButton";
import { Link } from "../../../components/common/react-link/Link";
import { GridResponsive } from "../../../assets/css/mui-css-objects/grid";

const Signup = () => (
  <Grid
    container
    sx={{
      p: 3,
      justifyContent: "center",
      alignItems: "center",
      // height: "calc(100vh - 64px)",
    }}
  >
    <Card elevation={2} component={Grid} size={GridResponsive}>
      <CardContent>
        <Typography variant="h4">Signup</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link underline="hover" to="/auth/login" variant="body2">
            Log in here!
          </Link>
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <SignupForm />
      </CardContent>
      <Divider>
        <Typography variant="caption" color="textSecondary">
          Or Using
        </Typography>
      </Divider>

      <CardContent>
        <GoogleAuthButton />
      </CardContent>
    </Card>
  </Grid>
);

export default Signup;
