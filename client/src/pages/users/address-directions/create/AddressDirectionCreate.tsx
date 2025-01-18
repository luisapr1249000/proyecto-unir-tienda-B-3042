import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import AddressDirectionCreateForm from "../../../../components/users_/address-direction/create/AddressDirectionCreateForm";

const AddressDirectionCreate = () => {
  return (
    <Grid container spacing={3} size={{ xs: 10 }} sx={{ border: 1, p: 3 }}>
      <Paper
        component={Grid}
        container
        spacing={3}
        sx={{ p: 3 }}
        variant="outlined"
      >
        <Grid container spacing={2} size={{ xs: 12 }}>
          <Grid>
            <Typography variant="h5">
              Create A New Address Direction!
            </Typography>
          </Grid>
          <Divider sx={{ width: 1 }} />
        </Grid>
        <AddressDirectionCreateForm />
      </Paper>
    </Grid>
  );
};

export default AddressDirectionCreate;
