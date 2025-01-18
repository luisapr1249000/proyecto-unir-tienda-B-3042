import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import AddressDirectionUpdateForm from "../../../../components/users_/address-direction/update/AddressDirectionUpdateForm";
import { useGetUserAddressById } from "../../../../hooks/user";
import CircleLoadingGrid from "../../../../components/common/loading/CircleLoadingGrid";
import ObjectNotFound from "../../../../components/common/errors/object-not-found/ObjectNotFound";
import { useParams } from "react-router-dom";

const AddressDirectionUpdate = () => {
  const { userId, addressDirectionId } = useParams() as {
    userId: string;
    addressDirectionId: string;
  };
  const {
    data: address,
    isLoading,
    error,
    refetch,
  } = useGetUserAddressById({
    userId: userId,
    addressDirectionId: addressDirectionId,
  });

  if (isLoading) return <CircleLoadingGrid />;
  if (error)
    return <ObjectNotFound object="Address Direction" onReload={refetch} />;
  if (!address)
    return <ObjectNotFound object="Address Direction" onReload={refetch} />;
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
              Update An Existed Address Direction!
            </Typography>
          </Grid>
          <Divider sx={{ width: 1 }} />
        </Grid>
        <AddressDirectionUpdateForm address={address} />
      </Paper>
    </Grid>
  );
};

export default AddressDirectionUpdate;
