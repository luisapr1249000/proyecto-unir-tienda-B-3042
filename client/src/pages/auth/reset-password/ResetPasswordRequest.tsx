import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Paper, Typography } from "@mui/material";
import ResetPasswordRequestForm from "../../../components/auth/reset-password/ResetPasswordRequestForm";
import { Link } from "../../../components/common/react-link/Link";

const ResetPasswordRequest = () => {
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
        {/* <Link underline="hover">rfre</Link> */}

        <Grid direction="column" container size={{ xs: 12 }} sx={{}}>
          <Typography gutterBottom variant="h4">
            Forgot Password?
          </Typography>
          <Divider sx={{ width: 1 }} />
          <Typography gutterBottom variant="body2">
            Already have an account?{" "}
            <Link underline="hover" href="/auth/login">
              Login Here
            </Link>
          </Typography>
        </Grid>
        <Divider sx={{ width: 1 }} />
        <ResetPasswordRequestForm />
      </Grid>
    </Grid>
  );
};

export default ResetPasswordRequest;
