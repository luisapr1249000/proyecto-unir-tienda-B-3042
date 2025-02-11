import Grid from "@mui/material/Grid2";
import { Divider, Typography, Card, CardContent } from "@mui/material";
import SendMailConfirmationForm from "../../../components/auth/send-mail/SendConfirmationMailForm";
import { GridResponsive } from "../../../assets/css/mui-css-objects/grid";
import { Link } from "../../../components/common/react-link/Link";
import { SendConfirmationEmailHelmet } from "./SendConfirmationEmailHelmet";

const SendConfirmationEmail = () => (
  <>
    <SendConfirmationEmailHelmet />
    <Grid
      container
      spacing={2}
      sx={{
        height: "calc(100vh)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card elevation={2} component={Grid} size={GridResponsive}>
        <CardContent>
          <Typography variant="h5">Confirm Email</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link underline="hover" to="/auth/login">
              Login Here
            </Link>
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <SendMailConfirmationForm />
        </CardContent>
      </Card>
    </Grid>
  </>
);

export default SendConfirmationEmail;
