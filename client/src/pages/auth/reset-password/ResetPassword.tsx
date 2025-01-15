import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useSearchParams } from "react-router-dom";
import { useVerifyToken } from "../../../hooks/auth";
import GridLoaderCenter from "../../../components/common/grid/grid-loader-center/GridLoaderCenter";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import { gridContainerCenter } from "../../../assets/css/mui-css-objects/gridCenter";
import { gridBreakpoints } from "../../../assets/css/mui-css-objects/muiStyles";
import { Link } from "../../../components/common/react-link/ReactLink";
import ResetPasswordForm from "../../../components/auth/reset-password/ResetPasswordForm";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, isSuccess, error } = useVerifyToken(
    searchParams.get("token") ?? ""
  );

  if (isLoading) return <GridLoaderCenter />;
  if (!isSuccess || error) return <Navigate to="/auth/login" />;

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
            Reset Your Password
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
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
