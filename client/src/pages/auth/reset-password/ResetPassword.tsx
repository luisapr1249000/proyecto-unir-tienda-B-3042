import { Navigate, useSearchParams } from "react-router-dom";
import { useVerifyToken } from "../../../hooks/auth";
import Grid from "@mui/material/Grid2";
import { Divider, Typography, Card, CardContent } from "@mui/material";
import ResetPasswordForm from "../../../components/auth/reset-password/ResetPasswordForm";
import { Link } from "../../../components/common/react-link/Link";
import { GridResponsive } from "../../../assets/css/mui-css-objects/grid";
import CircleLoadingGrid from "../../../components/common/loaders/CircleLoadingGrid";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, isSuccess, error } = useVerifyToken(
    searchParams.get("token") ?? ""
  );

  if (isLoading) return <CircleLoadingGrid />;
  if (!isSuccess || error) return <Navigate to="/auth/login" />;

  return (
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
          <Typography variant="h4">Reset Your Password</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="body2">
            Dont you have an account yet?{" "}
            <Link underline="hover" to="/auth/signup">
              Sign up here!
            </Link>
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <ResetPasswordForm token={searchParams.get("token") ?? ""} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ResetPassword;
