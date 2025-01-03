import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import SignupForm from "../../../components/auth/signupForm/SignupForm";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { gridBreakpoints } from "../../../assets/css/mui-css-objects/muiStyles";
import GoogleAuthButton from "../../../components/auth/google-auth-button/GoogleAuthButton";
import { Link } from "../../../components/common/react-link/Link";

const Signup = () => {
  return (
    <Grid container spacing={2} sx={{ ...gridContainerCenter, p: 5 }}>
      <Grid
        component={Paper}
        elevation={2}
        container
        size={gridBreakpoints}
        sx={{ p: 3 }}
      >
        <Grid direction="column" container size={{ xs: 12 }} sx={{}}>
          <Typography gutterBottom variant="h4">
            Signup For Free!
          </Typography>
          <Divider sx={{ width: 1 }} />
          <Typography gutterBottom variant="body2">
            Already have an account?{" "}
            <Link underline="hover" href="/auth/login" variant="body2">
              Login Here
            </Link>
          </Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <Grid container size={{ xs: 12 }} sx={{}}>
          <SignupForm />
        </Grid>
        <Divider sx={{ width: 1 }}>
          <Typography variant="caption" color="textSecondary">
            Or Using
          </Typography>
        </Divider>

        <Grid size={{ xs: 12 }} sx={{}}>
          <GoogleAuthButton />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
