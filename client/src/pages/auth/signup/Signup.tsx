import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SignupForm from "../../../components/auth/signupForm/SignupForm";

const Signup = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        component={Paper}
        elevation={2}
        container
        size={{ xs: 4 }}
        sx={{ p: 3 }}
      >
        <Grid direction="column" container size={{ xs: 12 }} sx={{}}>
          <Typography gutterBottom variant="h4">
            Signup For Free!
          </Typography>
          <Divider sx={{ width: 1 }} />
          <Typography gutterBottom variant="body2">
            Already have an account? <Link to="/auth/login">Login Here</Link>
          </Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <Grid container size={{ xs: 12 }} sx={{}}>
          <SignupForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
