import React from "react";
import { User } from "../../../../../types/user";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import UserGeneralInformationField from "../user-general-information-field/UserGeneralInformationField";

const UserGeneralInformationCard = ({ user }: { user: User }) => {
  const userInformationValues = [
    { label: "Id", value: user._id },
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
  ];

  const userOtherInformationValues = [
    { label: "Created At", value: user.createdAt },
    { label: "Updated At", value: user.updatedAt },
    { label: "Last Login", value: user.lastLogin },
    { label: "Is Seller", value: user.isSeller },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "User's role", value: user.role },
  ];

  return (
    // <Card sx={{ p: 3 }} variant="outlined">
    <Grid container direction="column" spacing={3}>
      <CardContent>
        <Grid sx={{}} container size={{ xs: 12 }} spacing={3}>
          {userInformationValues.map((userInformation) => (
            <UserGeneralInformationField
              value={userInformation.value ?? "No Data"}
              label={userInformation.label}
            />
          ))}
        </Grid>
      </CardContent>
      <Divider sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Other Information
        </Typography>
      </Divider>
      <CardContent>
        <Grid sx={{}} container size={{ xs: 12 }} spacing={3}>
          {userOtherInformationValues.map((userInformation) => (
            <UserGeneralInformationField
              value={userInformation.value ?? "No Data"}
              label={userInformation.label}
            />
          ))}
        </Grid>
      </CardContent>
    </Grid>
    // </Card>
  );
};

export default UserGeneralInformationCard;
