import Grid from "@mui/material/Grid2";
import { Divider, Typography } from "@mui/material";
import AddressDirectionUpdateForm from "../../../../components/users_/address-direction/update/AddressDirectionUpdateForm";
import { useGetUserAddressById } from "../../../../hooks/user";
import CircleLoadingGrid from "../../../../components/common/loaders/CircleLoadingGrid";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuthUser } from "../../../../hooks/auth";
import { GridObjectNotFound } from "../../../../components/common/errors/object-not-found/ObjectNotFound";
import AddressUpdateHelmet from "./AddressDirectionUpdateHelmet";

const AddressDirectionUpdate = () => {
  const { addressDirectionId } = useParams() as {
    username: string;
    addressDirectionId: string;
  };

  const { data: authUser } = useAuthUser();
  const {
    data: address,
    isLoading,
    error,
    refetch,
  } = useGetUserAddressById({
    enabled: !!authUser,
    userId: authUser?._id ?? "",
    addressDirectionId: addressDirectionId,
  });

  if (isLoading) return <CircleLoadingGrid />;
  if (error)
    return <GridObjectNotFound object="Address Direction" onReload={refetch} />;
  if (!address)
    return <GridObjectNotFound object="Address Direction" onReload={refetch} />;

  return (
    <>
      <AddressUpdateHelmet />{" "}
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
    </>
  );
};

export default AddressDirectionUpdate;
