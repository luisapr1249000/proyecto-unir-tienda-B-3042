import { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import LoginForm from "../../../components/auth/loginForm/LoginForm";
import ReactLink from "../../../components/common/react-link/ReactLink";
import { toast } from "react-toastify";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { gridBreakpoints } from "../../../assets/css/mui-css-objects/muiStyles";
import GoogleAuthButton from "../../../components/auth/google-auth-button/GoogleAuthButton";
import { Link } from "../../../components/common/react-link/Link";

const Login = () => {
  let { state } = useLocation();
  console.log(state);
  useEffect(() => {
    if (state && state.loginRequired) {
      state.loginRequired = false;
      toast.warning("Login required");
    }
  }, []);
  return (
    <Grid container spacing={3} sx={{ ...gridContainerCenter }}>
      <Grid
        component={Paper}
        elevation={2}
        container
        size={gridBreakpoints}
        sx={{ p: 3 }}
      >
        <Grid direction="column" container size={{ xs: 12 }} sx={{}}>
          <Typography gutterBottom variant="h4">
            Login to your account
          </Typography>
          <Divider sx={{ width: 1 }} />
          <Typography component="div" variant="body2">
            Dont you have an account yet?{" "}
            <Link underline="hover" href="/auth/signup" variant="body2">
              Sign up here!
            </Link>
          </Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <Grid container size={{ xs: 12 }} sx={{}}>
          <LoginForm />
        </Grid>
        <Divider sx={{ width: 1 }}>
          <Typography variant="caption" color="textSecondary">
            Or Using
          </Typography>
        </Divider>

        <Grid size={{ xs: 12 }} sx={{}}>
          <GoogleAuthButton />
        </Grid>
        <Link
          underline="hover"
          href="/auth/request-reset-password"
          variant="body2"
        >
          Forgot Password
        </Link>
      </Grid>
    </Grid>
  );
};

export default Login;
