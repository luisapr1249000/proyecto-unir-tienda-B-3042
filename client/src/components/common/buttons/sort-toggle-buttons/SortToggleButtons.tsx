import { MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";

const SortToggleButtons = ({
  handleChange,
  sortValue,
}: {
  handleChange: (sort: string) => void;
  sortValue: string;
}) => {
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    handleChange(value);
  };

  const sortOptions = [
    { value: "finalPrice", label: "Price: Low to High" },
    { value: "-finalPrice", label: "Price: High to Low" },
    { value: "discount", label: "Discount: Descending" },
    { value: "-discount", label: "Discount: Ascending" },
    { value: "-createdAt", label: "Created At: Ascending" },
    { value: "createdAt", label: "Created At: Descending" },
    { value: "-updatedAt", label: "Updated At: Ascending" },
    { value: "createdAt", label: "Updated At: Descending" },
  ];

  return (
    <TextField
      select
      value={sortValue}
      onChange={handleSelectChange}
      label="Sort by"
      fullWidth
      slotProps={{ input: { sx: { fontSize: 13 } } }}
    >
      {sortOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SortToggleButtons;
