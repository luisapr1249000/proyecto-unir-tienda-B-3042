import { MenuItem, TextField } from "@mui/material";
import React from "react";

const PageLimitSetter = ({
  limit,
  setLimit,
}: {
  limit: number;
  setLimit: (limit: number) => void;
}) => {
  const options = [10, 20, 30, 40, 50];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(e.target.value));
  };
  return (
    <TextField
      value={limit}
      onChange={handleChange}
      select
      label="Limit"
      fullWidth
      slotProps={{ input: { sx: { fontSize: 12 } } }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PageLimitSetter;
