import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "../../../components/auth/loginForm/LoginForm";
import ReactLink from "../../../components/common/react-link/ReactLink";

const Login = () => {
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
            Login to your account
          </Typography>
          <Divider sx={{ width: 1 }} />
          <Typography component="div" variant="body2">
            Dont you have an account yet?{" "}
            <Typography
              sx={{ color: "#00f" }}
              to="/auth/signup"
              component={ReactLink}
              variant="body2"
            >
              Sign up here!
            </Typography>
          </Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <Grid container size={{ xs: 12 }} sx={{}}>
          <LoginForm />
        </Grid>
        <Typography
          sx={{ color: "#00f" }}
          variant="body2"
          component={ReactLink}
          to="/auth/reset-password"
        >
          Forgot Password?
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
