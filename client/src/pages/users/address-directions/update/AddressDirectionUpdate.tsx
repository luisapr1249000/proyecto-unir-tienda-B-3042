import React from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import AddressDirectionUpdateForm from "../../../../components/users_/address-direction/update/AddressDirectionUpdateForm";
import { useGetUserAddressById } from "../../../../hooks/user";
import CircleLoadingGrid from "../../../../components/common/loaders/CircleLoadingGrid";
import ObjectNotFound from "../../../../components/common/errors/object-not-found/ObjectNotFound";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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
    <Grid
      container
      spacing={3}
      size={{ xs: 10 }}
      sx={{
        p: 3,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5">Update Address Directions</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <AddressDirectionUpdateForm address={address} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddressDirectionUpdate;
