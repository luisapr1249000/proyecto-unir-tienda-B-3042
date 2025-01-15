import { MenuItem, TextField } from "@mui/material";
import React from "react";

const SortSelecter = ({
  sortBy,
  handleChange,
}: {
  sortBy: string;
  handleChange: (sort: string) => void;
}) => {
  const sortOptions = [
    { value: "finalPrice", label: "Price: Low to High" },
    { value: "-finalPrice", label: "Price: High to Low" },
    { value: "discount", label: "Discount: Descending" },
    { value: "-discount", label: "Discount: Ascending" },
    { value: "-createdAt", label: "Created At: Ascending" },
    { value: "createdAt", label: "Created At: Descending" },
    { value: "-updatedAt", label: "Updated At: Ascending" },
    { value: "updatedAt", label: "Updated At: Descending" },
  ];
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    handleChange(value);
  };
  return (
    <TextField
      select
      value={sortBy}
      onChange={handleSelectChange}
      label="Sort by"
      fullWidth
      slotProps={{ input: { sx: { fontSize: 12 } } }}
    >
      {sortOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SortSelecter;
