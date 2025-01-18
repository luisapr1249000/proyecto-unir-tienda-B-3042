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

const AddressSpecificationCard = ({
  specification,
  label,
}: {
  specification: string;
  label: string;
}) => (
  <TextField
    name={label}
    label={label}
    placeholder="Specification"
    value={specification}
    fullWidth
    variant="standard"
    slotProps={{ inputLabel: { shrink: true }, input: { readOnly: true } }}
  />
);

const AddressDirectionCardButtons = ({ addressId }: { addressId: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => setOpenDialog(true);

  return (
    <Grid container spacing={2} size={{ xs: 12 }}>
      <Button
        component={Link}
        to={addressId + "/update"}
        startIcon={<EditIcon />}
        variant="outlined"
        size="small"
      >
        Edit
      </Button>
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
        onCancel={() => setOpenDialog(false)}
        onDeleteObject={() => setOpenDialog(false)}
      />
    </Grid>
  );
};

const AddressDirectionCard = ({
  address,
  addressIndex,
}: {
  address: AddressDirection;
  addressIndex: number;
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
    <Card variant="outlined">
      <CardContent component={Grid} container spacing={3} size={{ xs: 12 }}>
        <Typography variant="h6" component="div">
          Address Direction {addressIndex + 1}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent component={Grid} container spacing={3} size={{ xs: 12 }}>
        {addressDirectionValues.map((addressDirectionValue, index) => (
          <Grid key={index} size={{ xs: 12 }}>
            <AddressSpecificationCard
              specification={addressDirectionValue.value ?? "N/A"}
              label={addressDirectionValue.label}
            />
          </Grid>
        ))}
      </CardContent>
      <CardActions>
        <AddressDirectionCardButtons addressId={address._id} />
      </CardActions>
    </Card>
  );
};
export default AddressDirectionCard;
