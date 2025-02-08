import { AddressDirection } from "../../../../types/user";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { Divider } from "@mui/material";

import AddressDirectionSecondaryActions from "./secondary-actions/AddressDirectionSecondaryActions";

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
      <AddressDirectionSecondaryActions
        addressId={address._id}
        isDefault={address.isDefault ?? false}
      />
    </Card>
  );
};
export default AddressDirectionCard;
