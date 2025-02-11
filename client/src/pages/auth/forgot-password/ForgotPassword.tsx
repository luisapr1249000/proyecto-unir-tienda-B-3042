import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import SendForgotPasswordMailForm from "../../../components/auth/send-mail/SendForgotPasswordMailForm";
import { GridResponsive } from "../../../assets/css/mui-css-objects/grid";
import { Link } from "../../../components/common/react-link/Link";
import ForgotPasswordHelmet from "./ForgotPasswordHelmet";

const ForgotPassword = () => (
  <>
    <ForgotPasswordHelmet />
    <Grid
      container
      spacing={3}
      sx={{
        p: 5,
        border: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
      }}
    >
      <Card elevation={2} component={Grid} size={GridResponsive}>
        <CardContent>
          <Typography variant="h5">Forgot Password</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="body2">
            Dont you have an account?{" "}
            <Link underline="hover" to="/auth/signup">
              Sign up here!
            </Link>
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <SendForgotPasswordMailForm />
        </CardContent>
      </Card>
    </Grid>
  </>
);

export default ForgotPassword;
