import React, { useState } from "react";
import { AddressDirection } from "../../../../types/user";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { Button, CardActions, Divider, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import DialogConfirmAction from "../../../common/dialogs/dialog-confirm-action/DialogConfirmAction";
import StarIcon from "@mui/icons-material/Star";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDefaultAddressDirection } from "../../../../api/users/address.api";
import { toast } from "react-toastify";
import { useAuthUser } from "../../../../hooks/auth";
import BackdropLoading from "../../../common/loaders/BackdropLoading";

const ButtonSetAsDefault = ({ addressId }: { addressId: string }) => {
  const queryClient = useQueryClient();
  const { data: authUser } = useAuthUser();
  const {
    mutate: setDefaultAddressDirectionMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: setDefaultAddressDirection,
    onSuccess: () => {
      console.log("address created");
      toast.success("Set as default address direction successfully");
      queryClient.invalidateQueries({
        queryKey: [`user-${authUser?._id}-address-direction`],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error setting as default address direction");
    },
  });
  const handleClick = () => {
    setDefaultAddressDirectionMutation({
      userId: authUser?._id ?? "",
      addressDirectionId: addressId,
    });
  };
  if (isPending) return <BackdropLoading />;
  return (
    <Button onClick={handleClick} variant="outlined" size="small">
      default
    </Button>
  );
};

const AddressDirectionCardButtons = ({
  addressId,
  isDefault,
}: {
  addressId: string;
  isDefault: boolean;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => setOpenDialog(true);
  const { data: authUser } = useAuthUser();

  const link = `/users/${authUser?.username}/address-directions/${addressId}/update`;
  return (
    <Grid container spacing={2} size={{ xs: 12 }}>
      <Button
        component={Link}
        to={link}
        startIcon={<EditIcon />}
        variant="outlined"
        size="small"
      >
        Edit
      </Button>

      {!isDefault && (
        <>
          <ButtonSetAsDefault addressId={addressId} />

          <Button
            startIcon={<ClearIcon />}
            variant="outlined"
            size="small"
            color="error"
            onClick={handleClickOpen}
          >
            Delete
          </Button>
          <DialogConfirmAction
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onDeleteObject={() => setOpenDialog(false)}
          />
        </>
      )}
    </Grid>
  );
};

const AddressDirectionCard = ({
  address,
  addressIndex,
}: {
  address: AddressDirection;
  addressIndex?: number;
}) => {
  const addressDirectionValues = [
    {
      label: "Address Line 1",
      value: address.addressLine1,
    },
    {
      label: "Address Line 2",
      value: address.addressLine2,
    },
    {
      label: "City District Town",
      value: address.cityDistrictTown,
    },
    {
      label: "State",
      value: address.state,
    },
    {
      label: "Country",
      value: address.country,
    },
    {
      label: "Mobile Phone",
      value: address.mobilePhone,
    },
    {
      label: "Pin Code",
      value: address.pinCode,
    },
    {
      label: "Locality",
      value: address.locality,
    },
    {
      label: "Landmark",
      value: address.landmark,
    },
    {
      label: "Address Type",
      value: address.addressType,
    },
  ];

  return (
    <Card sx={{}} elevation={5}>
      <CardContent
        component={Grid}
        container
        spacing={3}
        size={{ xs: 12 }}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component="div">
          {address.isDefault ? (
            <>Default Address Direction</>
          ) : (
            `Address Direction ${addressIndex ? addressIndex + 1 : ""}`
          )}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent component={Grid} container size={{ xs: 12 }}>
        {addressDirectionValues.map((addressDirectionValue, index) => (
          <Grid key={index} size={{ xs: 12 }}>
            <Typography gutterBottom variant="subtitle2" color="textSecondary">
              {addressDirectionValue.label}:{" "}
              {addressDirectionValue.value ?? "N/A"}
            </Typography>
          </Grid>
        ))}
      </CardContent>
      <Divider />
      <CardActions>
        <AddressDirectionCardButtons
          isDefault={address.isDefault ?? false}
          addressId={address._id}
        />
      </CardActions>
    </Card>
  );
};
export default AddressDirectionCard;
