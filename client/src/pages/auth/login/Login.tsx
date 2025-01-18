import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Paper, Typography } from "@mui/material";
import LoginForm from "../../../components/auth/loginForm/LoginForm";
import GoogleAuthButton from "../../../components/auth/google-auth-button/GoogleAuthButton";
import { Link } from "../../../components/common/react-link/Link";
import { GridResponsive } from "../../../assets/css/mui-css-objects/grid";

const Login = () => (
  <Grid
    container
    sx={{
      p: 3,
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 64px)",
    }}
  >
    <Card elevation={2} component={Grid} size={GridResponsive}>
      <CardContent>
        <Typography variant="h4">Login</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="body2">
          Don't you have an account yet?{" "}
          <Link underline="hover" to="/auth/signup" variant="body2">
            Sign up here!
          </Link>
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <LoginForm />
      </CardContent>
      <Divider>
        <Typography variant="caption" color="textSecondary">
          Or Using
        </Typography>
      </Divider>

      <CardContent>
        <GoogleAuthButton />
      </CardContent>
      <Divider />
      <CardContent spacing={2} component={Grid} container direction="column">
        <Link variant="body2" underline="none" to="/auth/forgot-password">
          Forgot Password
        </Link>
        <Link
          variant="body2"
          underline="none"
          to="/auth/send-mail-confirmation"
        >
          Send Confirmation Email
        </Link>
      </CardContent>
    </Card>
  </Grid>
);

export default Login;
