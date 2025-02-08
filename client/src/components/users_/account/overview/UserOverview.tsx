import { UserProp } from "../../../../types/user";
import { CardContent, Divider, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { formatDate } from "../../../../utils/util.dates";

const UserSpecificationCard = ({
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

const UserOverviewCard = ({ user }: UserProp) => {
  console.log(user);
  const firstFieldList = [
    {
      label: "Username",
      value: user.username,
    },
    {
      label: "Email",
      value: user.email,
    },
    {
      label: "Has Confirmed Email",
      value: user.hasConfirmedEmail ? "Yes" : "No",
    },
    {
      label: "First Name",
      value: user.firstName,
    },
    {
      label: "Last Name",
      value: user.lastName,
    },
    {
      label: "Phone Number",
      value: user.mobilePhone,
    },
    {
      label: "Is Seller",
      value: user.isSeller ? "Yes" : "No",
    },
  ];

  const secondFieldList = [
    {
      label: "Bio",
      value: user.bio,
    },
    {
      label: "Role",
      value: user.role,
    },
    {
      label: "Last Login",
      value: formatDate(user.lastLogin),
    },
  ];

  const thirdFieldList = [
    {
      label: "Created At",
      value: formatDate(user.createdAt),
    },
    {
      label: "Updated At",
      value: formatDate(user.updatedAt),
    },
  ];
  return (
    <>
      <CardContent component={Grid} container spacing={3}>
        {firstFieldList.map((specification, index) => (
          <UserSpecificationCard
            key={index}
            specification={
              specification.value ? String(specification.value) : "N/A"
            }
            label={specification.label}
          />
        ))}
      </CardContent>
      <Divider />
      <CardContent component={Grid} container spacing={3}>
        {secondFieldList.map((specification, index) => (
          <UserSpecificationCard
            key={index}
            specification={
              specification.value ? String(specification.value) : "N/A"
            }
            label={specification.label}
          />
        ))}
      </CardContent>
      <Divider />

      <CardContent component={Grid} container spacing={3}>
        {thirdFieldList.map((specification, index) => (
          <UserSpecificationCard
            key={index}
            specification={
              specification.value ? String(specification.value) : "N/A"
            }
            label={specification.label}
          />
        ))}
      </CardContent>
    </>
  );
};

export default UserOverviewCard;
