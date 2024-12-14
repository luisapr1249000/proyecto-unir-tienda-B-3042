import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ResetPasswordForm from "../../../components/auth/reset-password/ResetPasswordForm";
import { useVerifyToken } from "../../../hooks/auth";
import LoadSpinner from "../../../components/common/load-spinner/LoadSpinner";
import { Link } from "../../../components/common/react-link/Link";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, isError } = useVerifyToken(token ?? "");

  if (isLoading) {
    return <LoadSpinner />;
  }
  if (isError) navigate("/");
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
            Forgot Password?
          </Typography>
          <Divider sx={{ width: 1 }} />
          <Typography gutterBottom variant="body2">
            Already have an account? <Link to="/auth/login">Login Here</Link>
          </Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <ResetPasswordForm />
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
