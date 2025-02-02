import React from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import AddressDirectionCreateForm from "../../../../components/users_/address-direction/create/AddressDirectionCreateForm";
import { useAuthUser } from "../../../../hooks/auth";

const AddressDirectionCreate = () => {
  const { data: authUser } = useAuthUser();
  if (!authUser) return <></>;
  return (
    <Grid container spacing={3} size={{ xs: 10 }} sx={{ border: 1, p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Address Directions</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <AddressDirectionCreateForm userId={authUser._id} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddressDirectionCreate;
