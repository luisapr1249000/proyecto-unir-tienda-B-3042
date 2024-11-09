import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LoginForm from "../../../components/auth/loginForm/LoginForm";

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
            Login
          </Typography>
          <Divider sx={{ width: 1 }} />
          <Typography variant="body2">
            Dont you have an account yet?{" "}
            <Link to="/auth/signup">Signup Here</Link>
          </Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <Grid container size={{ xs: 12 }} sx={{}}>
          <LoginForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
