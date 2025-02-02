import { MenuItem, TextField } from "@mui/material";
import React from "react";

const SelectAddresDirectionType = ({
  setAddressType,
  addressType,
}: {
  setAddressType: (value: "home" | "work") => void;
  addressType: "home" | "work";
}) => {
  const menuItemOptions = [
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressType(event.target.value as "home" | "work");
  };
  return (
    <TextField
      onChange={handleChange}
      select
      fullWidth
      label="Address Type"
      value={addressType}
    >
      {menuItemOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectAddresDirectionType;
