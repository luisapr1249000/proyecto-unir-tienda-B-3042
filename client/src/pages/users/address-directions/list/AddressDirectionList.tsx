import React from "react";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import CircleLoadingGrid from "../../../../components/common/loading/CircleLoadingGrid";
import { useGetUserAddresses } from "../../../../hooks/user";
import ObjectNotFound from "../../../../components/common/errors/object-not-found/ObjectNotFound";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import AddressDirectionCard from "../../../../components/users_/address-direction/card/AddressDirectionCard";
import { ButtonLink } from "../../../../components/common/buttons/button-text-link/ButtonTextLink";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const MobileCreateButton = ({ username }: { username: string }) => (
  <Fab
    color="primary"
    aria-label="add"
    sx={{
      position: "absolute",
      bottom: 16,
      right: 16,
      display: { xs: "flex", md: "none" },
    }}
    component={Link}
    to={`/users/${username}/address-directions/create`}
  >
    <AddIcon />
  </Fab>
);

const ButtonAddAddressDirection = ({ username }: { username: string }) => (
  <ButtonLink
    to={`/users/${username}/address-directions/create`}
    variant="outlined"
    size="small"
    startIcon={<AddIcon />}
  >
    Create Address Direction
  </ButtonLink>
);

const AddressDirectionList = () => {
  const { username } = useParams();
  const { data: addressDirections, isLoading } = useGetUserAddresses({
    userId: username ?? "",
  });

  if (isLoading) return <CircleLoadingGrid />;

  const hasAddressDirections =
    addressDirections && addressDirections.length > 0;
  return (
    <Grid
      container
      spacing={3}
      size={{ xs: 10 }}
      sx={{
        bgcolor: "divider",
        p: 3,
      }}
    >
      <Card
        sx={{
          flexGrow: 1,
          height: hasAddressDirections ? undefined : "calc(100vh - 64px)",
          position: "relative",
        }}
        variant="outlined"
      >
        <MobileCreateButton username={username ?? ""} />
        <CardContent>
          <Typography variant="h6">Address Directions</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <ButtonAddAddressDirection username={username ?? ""} />
        </CardContent>
        <Divider />
        <CardContent>
          {hasAddressDirections ? (
            addressDirections.map((addressDirection, index) => (
              <Grid
                key={addressDirection._id}
                size={{ xs: 12, md: 3 }}
                spacing={3}
              >
                <AddressDirectionCard
                  address={addressDirection}
                  addressIndex={index}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No address directions yet, Create the first to create one!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddressDirectionList;
